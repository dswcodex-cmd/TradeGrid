import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import twilio from "twilio";
import prisma from "../prismaClient.js";

const twilioClient = twilio(
  process.env.TWILIO_ASID,
  process.env.TWILIO_AUTH_TOKEN
);

const normalizeRegistrationNumber = (value) =>
  String(value || "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toLowerCase();

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
    
    const RegExEmail= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const RegExPassword= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!RegExEmail.test(email) || !RegExPassword.test(Password)) {
      return res.status(400).json({
        error: "Invalid email or password format"
      });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);

    const user = await prisma.company.create({
    data: {
      registration_number,
      email,
      is_email_verified: false,
      Password: hashedPassword,
      company_name,
      business_type
      }
    });

    res.status(201).json({
      message: "Signup successful. Verify your email before logging in.",
      user: {
        company_id: user.company_id,
        company_name: user.company_name,
        email: user.email,
        is_email_verified: user.is_email_verified
      }
    });
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

    if (!user.is_email_verified) {
      return res.status(403).json({ message: "Verify your email before logging in" });
    }

    if (user.account_status === "suspended") {
      return res.status(403).json({
        message: user.suspension_reason
          ? `Account suspended: ${user.suspension_reason}`
          : "Your account is suspended"
      });
    }

    const isMatch = await bcrypt.compare(Password, user.Password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Email or password" });
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

    const user = await prisma.company.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(404).json({ error: "Company not found for this email" });
    }

    await prisma.company.update({
      where: { email },
      data: {
        is_email_verified: true,
        email_verified_at: new Date()
      }
    });

    return res.status(200).json({
      message: "Email verified successfully",
      status: verificationCheck.status
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const verifyRegistrationNumber = async (req, res) => {
  try {
    const { registration_number, jurisdiction_code = "za" } = req.body;

    if (!registration_number) {
      return res.status(400).json({ error: "registration_number is required" });
    }

    if (!process.env.OPENCORPORATES_API_KEY) {
      return res.status(500).json({ error: "OpenCorporates API key is not configured" });
    }

    const targetNumber = normalizeRegistrationNumber(registration_number);
    const candidateNumbers = [...new Set([
      String(registration_number).trim(),
      targetNumber,
      String(registration_number).replace(/\s+/g, "")
    ].filter(Boolean))];

    let exactMatch = null;
    let companies = [];

    for (const candidateNumber of candidateNumbers) {
      const searchParams = new URLSearchParams({
        q: candidateNumber,
        jurisdiction_code,
        fields: "company_number,native_company_number,heavily_normalised_number",
        normalise_company_name: "false",
        order: "score",
        api_token: process.env.OPENCORPORATES_API_KEY
      });

      const response = await fetch(`https://api.opencorporates.com/v0.4/companies/search?${searchParams.toString()}`, {
        headers: {
          "X-API-TOKEN": process.env.OPENCORPORATES_API_KEY
        }
      });

      const data = await response.json();

      if (!response.ok) {
        return res.status(response.status).json({
          error: data?.error || data?.message || "OpenCorporates lookup failed"
        });
      }

      companies = data?.results?.companies || [];

      exactMatch = companies.find((entry) => {
        const company = entry.company;
        return (
          normalizeRegistrationNumber(company?.company_number) === targetNumber ||
          normalizeRegistrationNumber(company?.native_company_number) === targetNumber
        );
      });

      if (exactMatch) {
        break;
      }
    }

    if (!exactMatch) {
      for (const candidateNumber of candidateNumbers) {
        const exactResponse = await fetch(
          `https://api.opencorporates.com/v0.4/companies/${encodeURIComponent(jurisdiction_code)}/${encodeURIComponent(candidateNumber)}?api_token=${encodeURIComponent(process.env.OPENCORPORATES_API_KEY)}`
        );

        if (!exactResponse.ok) {
          continue;
        }

        const exactData = await exactResponse.json();
        const exactCompany = exactData?.results?.company;

        if (
          exactCompany &&
          (
            normalizeRegistrationNumber(exactCompany.company_number) === targetNumber ||
            normalizeRegistrationNumber(exactCompany.native_company_number) === targetNumber
          )
        ) {
          exactMatch = { company: exactCompany };
          break;
        }
      }
    }

    if (!exactMatch) {
      const debugCandidates = companies.slice(0, 5).map((entry) => ({
        name: entry.company?.name,
        company_number: entry.company?.company_number,
        native_company_number: entry.company?.native_company_number,
        jurisdiction_code: entry.company?.jurisdiction_code
      }));

      console.log("OpenCorporates verification miss", {
        registration_number,
        jurisdiction_code,
        matches_found: companies.length,
        candidates: debugCandidates
      });

      return res.status(404).json({
        verified: false,
        message: "No exact company match found for that registration number",
        matches_found: companies.length
      });
    }

    const company = exactMatch.company;

    return res.status(200).json({
      verified: true,
      company: {
        name: company.name,
        company_number: company.company_number,
        native_company_number: company.native_company_number,
        jurisdiction_code: company.jurisdiction_code,
        current_status: company.current_status,
        incorporation_date: company.incorporation_date,
        registered_address_in_full: company.registered_address_in_full,
        opencorporates_url: company.opencorporates_url
      }
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
