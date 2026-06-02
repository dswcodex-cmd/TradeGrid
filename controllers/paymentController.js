import crypto from "crypto";
import prisma from "../prismaClient.js";

const generateReference = () => `pay_${Date.now()}_${crypto.randomBytes(6).toString("hex")}`;

const syncPaymentStatus = async (payment, transactionStatus) => {
  let updatedPayment;

  if (transactionStatus === "success") {
    updatedPayment = await prisma.payment.update({
      where: { payment_id: payment.payment_id },
      data: {
        status: "paid",
        paid_at: payment.paid_at ?? new Date()
      }
    });

    const existingRecipientNotification = await prisma.notification.findFirst({
      where: {
        company_id: payment.recipient_company_id,
        payment_id: payment.payment_id,
        type: "payment_received"
      }
    });

    const existingPayerNotification = await prisma.notification.findFirst({
      where: {
        company_id: payment.payer_company_id,
        payment_id: payment.payment_id,
        type: "payment_sent"
      }
    });

    if (!existingRecipientNotification) {
      await prisma.notification.create({
        data: {
          company_id: payment.recipient_company_id,
          type: "payment_received",
          message: `${payment.payer_company.company_name} sent you a payment`,
          related_company_id: payment.payer_company_id,
          payment_id: payment.payment_id
        }
      });
    }

    if (!existingPayerNotification) {
      await prisma.notification.create({
        data: {
          company_id: payment.payer_company_id,
          type: "payment_sent",
          message: `You sent a payment to ${payment.recipient_company.company_name}`,
          related_company_id: payment.recipient_company_id,
          payment_id: payment.payment_id
        }
      });
    }
  } else if (transactionStatus === "failed" || transactionStatus === "abandoned") {
    updatedPayment = await prisma.payment.update({
      where: { payment_id: payment.payment_id },
      data: {
        status: "failed"
      }
    });

    const existingFailedNotification = await prisma.notification.findFirst({
      where: {
        company_id: payment.payer_company_id,
        payment_id: payment.payment_id,
        type: "payment_failed"
      }
    });

    if (!existingFailedNotification) {
      await prisma.notification.create({
        data: {
          company_id: payment.payer_company_id,
          type: "payment_failed",
          message: `Your payment to ${payment.recipient_company.company_name} was not completed`,
          related_company_id: payment.recipient_company_id,
          payment_id: payment.payment_id
        }
      });
    }
  } else {
    updatedPayment = payment;
  }

  return updatedPayment;
};

export const initializePayment = async (req, res) => {
  try {
    const payer_company_id = Number(req.company.company_id);
    const { recipient_company_id, amount, description, currency = "ZAR" } = req.body;
    const numericRecipientCompanyId = Number(recipient_company_id);
    const numericAmount = Number(amount);

    if (!payer_company_id) {
      return res.status(401).json({ error: "Authenticated company id missing" });
    }

    if (!recipient_company_id || Number.isNaN(numericRecipientCompanyId)) {
      return res.status(400).json({ error: "recipient_company_id must be a valid number" });
    }

    if (!amount || Number.isNaN(numericAmount) || !Number.isInteger(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({ error: "amount must be a positive integer in Rands" });
    }

    if (payer_company_id === numericRecipientCompanyId) {
      return res.status(400).json({ error: "You cannot pay your own company" });
    }

    if (!process.env.PAYSTACK_SECRET_KEY) {
      return res.status(500).json({ error: "Paystack is not configured" });
    }

    const [payerCompany, recipientCompany] = await Promise.all([
      prisma.company.findUnique({
        where: { company_id: payer_company_id },
        select: {
          company_id: true,
          company_name: true,
          email: true
        }
      }),
      prisma.company.findUnique({
        where: { company_id: numericRecipientCompanyId },
        select: {
          company_id: true,
          company_name: true
        }
      })
    ]);

    if (!payerCompany) {
      return res.status(404).json({ error: "Payer company not found" });
    }

    if (!payerCompany.email) {
      return res.status(400).json({ error: "Payer company email is required to initialize payment" });
    }

    if (!recipientCompany) {
      return res.status(404).json({ error: "Recipient company not found" });
    }

    const reference = generateReference();

    const payment = await prisma.payment.create({
      data: {
        payer_company_id,
        recipient_company_id: numericRecipientCompanyId,
        amount: numericAmount,
        currency,
        status: "pending",
        description,
        paystack_reference: reference
      }
    });

    const paystackResponse = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: payerCompany.email,
        amount: String(numericAmount),
        currency,
        reference,
        callback_url: process.env.PAYSTACK_CALLBACK_URL,
        metadata: {
          payment_id: payment.payment_id,
          payer_company_id,
          recipient_company_id: numericRecipientCompanyId,
          payer_company_name: payerCompany.company_name,
          recipient_company_name: recipientCompany.company_name,
          description: description ?? null
        }
      })
    });

    const paystackData = await paystackResponse.json();

    if (!paystackResponse.ok || !paystackData.status) {
      await prisma.payment.update({
        where: { payment_id: payment.payment_id },
        data: { status: "failed" }
      });

      return res.status(400).json({
        error: paystackData.message || "Failed to initialize payment with Paystack"
      });
    }

    const updatedPayment = await prisma.payment.update({
      where: { payment_id: payment.payment_id },
      data: {
        paystack_access_code: paystackData.data.access_code,
        paystack_authorization_url: paystackData.data.authorization_url
      }
    });

    return res.status(201).json({
      message: "Payment initialized successfully",
      payment: updatedPayment,
      authorization_url: paystackData.data.authorization_url,
      access_code: paystackData.data.access_code,
      reference: paystackData.data.reference
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { reference } = req.body;

    if (!reference) {
      return res.status(400).json({ error: "reference is required" });
    }

    if (!process.env.PAYSTACK_SECRET_KEY) {
      return res.status(500).json({ error: "Paystack is not configured" });
    }

    const payment = await prisma.payment.findUnique({
      where: { paystack_reference: reference },
      include: {
        payer_company: {
          select: {
            company_id: true,
            company_name: true
          }
        },
        recipient_company: {
          select: {
            company_id: true,
            company_name: true
          }
        }
      }
    });

    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }

    const paystackResponse = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
      }
    });

    const paystackData = await paystackResponse.json();

    if (!paystackResponse.ok || !paystackData.status) {
      return res.status(400).json({
        error: paystackData.message || "Failed to verify payment with Paystack"
      });
    }

    const transactionStatus = paystackData.data.status;

    const updatedPayment = await syncPaymentStatus(payment, transactionStatus);

    let responseMessage = "Payment verification completed";

    if (transactionStatus === "success") {
      responseMessage = "Payment verified successfully";
    } else if (transactionStatus === "failed") {
      responseMessage = "Payment failed";
    } else if (transactionStatus === "abandoned") {
      responseMessage = "Payment was abandoned";
    }

    return res.status(200).json({
      message: responseMessage,
      payment: updatedPayment,
      paystack_status: transactionStatus
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const paystackWebhook = async (req, res) => {
  try {
    if (!process.env.PAYSTACK_SECRET_KEY) {
      return res.status(500).json({ error: "Paystack is not configured" });
    }

    const signature = req.headers["x-paystack-signature"];
    const rawBody = req.body;

    const expectedSignature = crypto
      .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY)
      .update(rawBody)
      .digest("hex");

    if (!signature || signature !== expectedSignature) {
      return res.status(401).json({ error: "Invalid Paystack signature" });
    }

    const event = JSON.parse(rawBody.toString("utf8"));
    const reference = event?.data?.reference;
    const transactionStatus = event?.data?.status;

    if (!reference || !transactionStatus) {
      return res.status(200).json({ received: true });
    }

    const payment = await prisma.payment.findUnique({
      where: { paystack_reference: reference },
      include: {
        payer_company: {
          select: {
            company_id: true,
            company_name: true
          }
        },
        recipient_company: {
          select: {
            company_id: true,
            company_name: true
          }
        }
      }
    });

    if (!payment) {
      return res.status(200).json({ received: true });
    }

    await syncPaymentStatus(payment, transactionStatus);

    return res.status(200).json({ received: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
