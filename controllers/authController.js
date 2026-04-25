import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import twilio from "twilio";
import prisma from "../prismaClient.js";

const twilioClient = twilio(
  process.env.TWILIO_ASID,
  process.env.TWILIO_AUTH_TOKEN
);

export const signup = async (req, res) => {
    console.log("Signup");
  try {
    const { company_name, registration_number, email, Password, business_type } = req.body;

    console.log("prisma models:", prisma);
    console.log("company model:", prisma.company);

    const existingUser = await prisma.company.findFirst({
      where: {
        OR: [
          { registration_number },
          { email }
        ]
      }
    });

    if (existingUser) {
      return res.status(400).json({ message: "Company already registered" });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);

    const user = await prisma.company.create({
      data: {
        registration_number,
        email,
        Password: hashedPassword,
        company_name,
        business_type
      }
    });

    res.status(201).json(user);

  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, Password } = req.body;

    const user = await prisma.company.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(Password, user.Password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { company_id: user.company_id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: {
        company_id: user.company_id,
        company_name: user.company_name,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const sendEmailVerification = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "email is required" });
    }

    if (
      !process.env.TWILIO_ASID ||
      !process.env.TWILIO_AUTH_TOKEN ||
      !process.env.TWILIO_VERIFY_SERVICE_SID
    ) {
      return res.status(500).json({ error: "Twilio email verification is not configured" });
    }

    const verification = await twilioClient.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verifications.create({
        to: email,
        channel: "email"
      });

    return res.status(200).json({
      message: "Verification email sent",
      status: verification.status
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const verifyEmailCode = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ error: "email and code are required" });
    }

    const verificationCheck = await twilioClient.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verificationChecks.create({
        to: email,
        code
      });

    if (verificationCheck.status !== "approved") {
      return res.status(400).json({
        message: "Invalid or expired verification code",
        status: verificationCheck.status
      });
    }

    return res.status(200).json({
      message: "Email verified successfully",
      status: verificationCheck.status
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
