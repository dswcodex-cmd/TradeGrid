import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import twilio from "twilio";
import prisma from "../prismaClient.js";
import { validateCompanyReg } from "./validationService.js";

const twilioAccountSid = process.env.TWILIO_ASID || process.env.TWILIO_ACCOUNT_SID;

const twilioClient = twilio(
  twilioAccountSid,
  process.env.TWILIO_AUTH_TOKEN
);

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function ensureTwilioVerifyConfigured() {
  if (
    !twilioAccountSid ||
    !process.env.TWILIO_AUTH_TOKEN ||
    !process.env.TWILIO_VERIFY_SERVICE_SID
  ) {
    throw new Error("Twilio email verification is not configured");
  }
}

const emailOtpStore = new Map();
const EMAIL_OTP_TTL_MS = 10 * 60 * 1000;

function generateOtpCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function emailOtpKey(email, purpose) {
  return `${purpose}:${normalizeEmail(email)}`;
}

function saveEmailOtp(email, purpose) {
  const code = generateOtpCode();
  emailOtpStore.set(emailOtpKey(email, purpose), {
    code,
    expiresAt: Date.now() + EMAIL_OTP_TTL_MS
  });
  return code;
}

function verifyStoredEmailOtp(email, purpose, code) {
  const key = emailOtpKey(email, purpose);
  const record = emailOtpStore.get(key);

  if (!record || record.expiresAt < Date.now()) {
    emailOtpStore.delete(key);
    return false;
  }

  if (String(record.code) !== String(code).trim()) {
    return false;
  }

  emailOtpStore.delete(key);
  return true;
}

async function sendEmailOtp(email, purpose) {
  const code = saveEmailOtp(email, purpose);
  const subject = purpose === "password_reset"
    ? "Trade Grid password reset code"
    : "Trade Grid email verification code";
  const text = `Your Trade Grid verification code is ${code}. It expires in 10 minutes.`;

  if (process.env.SENDGRID_API_KEY && process.env.SENDGRID_FROM_EMAIL) {
    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email }] }],
        from: {
          email: process.env.SENDGRID_FROM_EMAIL,
          name: process.env.SENDGRID_FROM_NAME || "Trade Grid"
        },
        subject,
        content: [{ type: "text/plain", value: text }]
      })
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      throw new Error(errorText || "Could not send email code");
    }

    return { delivery: "email", status: "pending" };
  }

  console.warn(`[TradeGrid OTP] ${purpose} code for ${email}: ${code}`);
  return {
    delivery: "development",
    status: "pending",
    dev_code: process.env.NODE_ENV === "production" ? undefined : code
  };
}

const normalizeTradeType = (value) => {
  const normalized = String(value || "").trim().toUpperCase();
  if (normalized === "IMPORTER" || normalized === "EXPORTER" || normalized === "BOTH") {
    return normalized;
  }
  return "BOTH";
};

const parseEmployeeCount = (value) => {
  const raw = String(value || "").trim();
  if (!raw) return null;
  if (raw.endsWith("+")) return Number(raw.replace(/\D/g, "")) || null;
  const firstNumber = raw.match(/\d+/)?.[0];
  return firstNumber ? Number(firstNumber) : null;
};

const getOrCreateIndustry = async (industryName) => {
  const name = String(industryName || "").trim();
  if (!name) return null;

  return prisma.industry.upsert({
    where: { industry_name: name },
    update: {},
    create: { industry_name: name }
  });
};

const getOrCreateLocation = async (country) => {
  const countryName = String(country || "").trim();
  if (!countryName) return null;

  const existingLocation = await prisma.location.findFirst({
    where: {
      country: {
        equals: countryName,
        mode: "insensitive"
      }
    }
  });

  if (existingLocation) return existingLocation;

  return prisma.location.create({
    data: { country: countryName }
  });
};

const serializeMetadata = (payload) => JSON.stringify(payload, null, 2);

export const signup = async (req, res) => {
    console.log("Signup");
  try {
    const {
      company_name,
      registration_number,
      country_code,
      email,
      Password,
      password,
      business_type,
      trade_role,
      industry_name,
      year_established,
      number_of_employees,
      annual_trade_volume,
      company_description,
      country,
      address,
      phone,
      website,
      target_markets = [],
      documents = [],
      marketing_opt_in,
      onboarding
    } = req.body;
    const normalizedEmail = normalizeEmail(email);
    const rawPassword = Password || password;
    const normalizedRegistrationNumber = String(registration_number || "").trim();
    const normalizedCountryCode = String(country_code || onboarding?.address?.country || "").trim().toUpperCase();
    const companyName = String(company_name || "").trim();
    const businessType = String(business_type || "").trim();

    const RegExEmail= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const RegExPassword= passwordPattern;

    if (!companyName || !normalizedRegistrationNumber || !businessType) {
      return res.status(400).json({
        error: "company_name, registration_number, and business_type are required"
      });
    }

    if (!RegExEmail.test(normalizedEmail) || !RegExPassword.test(rawPassword)) {
      return res.status(400).json({
        error: "Invalid email or password format"
      });
    }

    if (normalizedCountryCode) {
      const registrationValidation = validateCompanyReg(normalizedCountryCode, normalizedRegistrationNumber);
      if (!registrationValidation.valid) {
        return res.status(400).json({
          error: registrationValidation.errors?.[0] || "Invalid registration number for the selected country",
          validation: registrationValidation
        });
      }
    }

    const existingUser = await prisma.company.findFirst({
      where: {
        OR: [
          { registration_number: normalizedRegistrationNumber },
          { email: normalizedEmail }
        ]
      }
    });

    if (existingUser) {
      return res.status(400).json({ message: "Company already registered" });
    }

    const hashedPassword = await bcrypt.hash(rawPassword, 10);
    const industry = await getOrCreateIndustry(industry_name || onboarding?.industry?.label || onboarding?.industry?.value);
    const location = await getOrCreateLocation(country || onboarding?.address?.country_label || onboarding?.address?.country);
    const metadata = {
      ...onboarding,
      trade_role,
      target_markets,
      documents: documents.map((document) => ({
        document_type: document.document_type,
        file_name: document.file_name,
        file_size: document.file_size,
        mime_type: document.mime_type
      })),
      marketing_opt_in: Boolean(marketing_opt_in)
    };

    const user = await prisma.company.create({
      data: {
        registration_number: normalizedRegistrationNumber,
        email: normalizedEmail,
        is_email_verified: false,
        account_status: "pending",
        Password: hashedPassword,
        company_name: companyName,
        business_type: businessType,
        trade_type: normalizeTradeType(trade_role),
        number_of_employees: parseEmployeeCount(number_of_employees),
        year_established: year_established ? Number(year_established) : null,
        annual_trade_volume: annual_trade_volume || null,
        company_description: company_description || null,
        address: address || null,
        phone: phone || null,
        website: website || null,
        notify_weekly_digest: Boolean(marketing_opt_in),
        iec_number: onboarding?.business?.permit_number || null,
        gst_number: onboarding?.business?.vat_number || null,
        admin_notes: serializeMetadata(metadata),
        ...(industry ? { industry_id: industry.industry_id } : {}),
        ...(location ? { location_id: location.location_id } : {})
      }
    });

    if (Array.isArray(target_markets) && target_markets.length) {
      for (const market of target_markets) {
        const regionName = String(market || "").trim();
        if (!regionName) continue;

        const region = await prisma.region.upsert({
          where: { region_name: regionName },
          update: {},
          create: { region_name: regionName }
        });

        await prisma.companyRegions.upsert({
          where: {
            company_id_region_id: {
              company_id: user.company_id,
              region_id: region.region_id
            }
          },
          update: {},
          create: {
            company_id: user.company_id,
            region_id: region.region_id
          }
        });
      }
    }

    if (Array.isArray(documents) && documents.length) {
      const validDocuments = documents
        .filter((document) => document?.document_type && document?.file_name)
        .map((document) => ({
          company_id: user.company_id,
          document_type: String(document.document_type),
          file_name: String(document.file_name),
          file_url: document.file_data_url || null,
          notes: document.notes || null,
          status: "pending",
          submitted_at: new Date()
        }));

      if (validDocuments.length) {
        await prisma.verificationDocument.createMany({
          data: validDocuments
        });
      }
    }

    res.status(201).json({
      message: "Signup successful. Your account is pending approval.",
      user: {
        company_id: user.company_id,
        company_name: user.company_name,
        email: user.email,
        is_email_verified: user.is_email_verified,
        account_status: user.account_status
      }
    });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, Password, password } = req.body;
    const normalizedEmail = normalizeEmail(email);
    const rawPassword = Password || password;

    if (!normalizedEmail || !rawPassword) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await prisma.company.findUnique({
      where: { email: normalizedEmail }
    });

    if (user) {
      const accountStatus = String(user.account_status || "").toLowerCase();
      const isMatch = await bcrypt.compare(rawPassword, user.Password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      if (!user.is_email_verified) {
        return res.status(403).json({ message: "Verify your email before logging in" });
      }

      if (accountStatus === "pending") {
        return res.status(403).json({
          message: "Your account is pending approval. You will receive an email once your account is activated."
        });
      }

      if (accountStatus !== "active") {
        return res.status(403).json({
          message: user.suspension_reason
            ? `Account ${accountStatus}: ${user.suspension_reason}`
            : `Your account is ${accountStatus}`
        });
      }

      const token = jwt.sign(
        {
          company_id: user.company_id,
          email: user.email,
          account_type: "company"
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        token,
        account_type: "company",
        redirect_to: "../User Dashboard - Page/user-dashboard.html",
        user: {
          company_id: user.company_id,
          company_name: user.company_name,
          email: user.email,
          account_status: accountStatus
        }
      });
    }

    const admin = await prisma.admin.findUnique({
      where: { email: normalizedEmail }
    });

    if (admin) {
      const isAdminPasswordValid = await bcrypt.compare(rawPassword, admin.password_hash);

      if (!isAdminPasswordValid) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      if (!admin.is_active) {
        return res.status(403).json({ message: "Your admin account is inactive" });
      }

      const normalizedRole = String(admin.role || "").toLowerCase();
      const adminRedirects = {
        superadmin: "../Admin - Page/admin.html",
        super_admin: "../Admin - Page/admin.html",
        admin: "../Admin - Page/admin.html",
        employee: "../Employee - Page/employee.html",
        verifier: "../Employee - Page/employee.html"
      };
      const redirectTo = adminRedirects[normalizedRole] || "../Admin - Page/admin.html";

      const token = jwt.sign(
        {
          admin_id: admin.admin_id,
          email: admin.email,
          role: normalizedRole,
          account_type: "admin"
        },
        process.env.JWT_SECRET,
        { expiresIn: "8h" }
      );

      await prisma.admin.update({
        where: { admin_id: admin.admin_id },
        data: { last_login_at: new Date() }
      });

      return res.status(200).json({
        token,
        account_type: "admin",
        redirect_to: redirectTo,
        admin: {
          admin_id: admin.admin_id,
          full_name: admin.full_name,
          email: admin.email,
          role: normalizedRole,
          is_active: admin.is_active
        }
      });
    }

    return res.status(400).json({ message: "Invalid email or password" });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const sendEmailVerification = async (req, res) => {
  try {
    const { email } = req.body;
    const normalizedEmail = normalizeEmail(email);

    if (!normalizedEmail) {
      return res.status(400).json({ error: "email is required" });
    }

    const verification = await sendEmailOtp(normalizedEmail, "email_verification");

    return res.status(200).json({
      message: "Verification email sent",
      status: verification.status,
      delivery: verification.delivery,
      ...(verification.dev_code ? { dev_code: verification.dev_code } : {})
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const verifyEmailCode = async (req, res) => {
  try {
    const { email, code } = req.body;
    const normalizedEmail = normalizeEmail(email);

    if (!normalizedEmail || !code) {
      return res.status(400).json({ error: "email and code are required" });
    }

    const isApproved = verifyStoredEmailOtp(normalizedEmail, "email_verification", code);

    if (!isApproved) {
      return res.status(400).json({
        message: "Invalid or expired verification code",
        status: "denied"
      });
    }

    const user = await prisma.company.findUnique({
      where: { email: normalizedEmail }
    });

    if (!user) {
      return res.status(404).json({ error: "Company not found for this email" });
    }

    await prisma.company.update({
      where: { email: normalizedEmail },
      data: {
        is_email_verified: true,
        email_verified_at: new Date()
      }
    });

    return res.status(200).json({
      message: "Email verified successfully",
      status: "approved"
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const sendPasswordResetCode = async (req, res) => {
  try {
    const normalizedEmail = normalizeEmail(req.body.email);

    if (!normalizedEmail) {
      return res.status(400).json({ error: "email is required" });
    }

    const user = await prisma.company.findUnique({
      where: { email: normalizedEmail }
    });

    if (!user) {
      return res.status(404).json({ error: "No company account found for this email" });
    }

    const verification = await sendEmailOtp(normalizedEmail, "password_reset");

    return res.status(200).json({
      message: "Password reset code sent",
      status: verification.status,
      delivery: verification.delivery,
      ...(verification.dev_code ? { dev_code: verification.dev_code } : {})
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const resetPasswordWithCode = async (req, res) => {
  try {
    const normalizedEmail = normalizeEmail(req.body.email);
    const { code, newPassword } = req.body;

    if (!normalizedEmail || !code || !newPassword) {
      return res.status(400).json({ error: "email, code, and newPassword are required" });
    }

    if (!passwordPattern.test(newPassword)) {
      return res.status(400).json({
        error: "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
      });
    }

    const user = await prisma.company.findUnique({
      where: { email: normalizedEmail }
    });

    if (!user) {
      return res.status(404).json({ error: "No company account found for this email" });
    }

    const isApproved = verifyStoredEmailOtp(normalizedEmail, "password_reset", code);

    if (!isApproved) {
      return res.status(400).json({
        message: "Invalid or expired reset code",
        status: "denied"
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.company.update({
      where: { email: normalizedEmail },
      data: { Password: hashedPassword }
    });

    return res.status(200).json({
      message: "Password reset successfully"
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
