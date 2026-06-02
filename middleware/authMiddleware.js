// middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import prisma from "../prismaClient.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.company_id || decoded?.account_type !== "company") {
      return res.status(403).json({ error: "Company account token is required" });
    }

    const company = await prisma.company.findUnique({
      where: { company_id: Number(decoded.company_id) },
      select: {
        company_id: true,
        email: true,
        account_status: true,
        suspension_reason: true
      }
    });

    if (!company) {
      return res.status(403).json({ error: "Company account is missing" });
    }

    const accountStatus = String(company.account_status || "").toLowerCase();
    if (accountStatus === "pending") {
      return res.status(403).json({
        error: "Your account is pending approval. You will receive an email once your account is activated."
      });
    }

    if (accountStatus !== "active") {
      return res.status(403).json({
        error: company.suspension_reason
          ? `Account ${accountStatus}: ${company.suspension_reason}`
          : `Your account is ${accountStatus}`
      });
    }

    req.company = {
      ...decoded,
      company_id: company.company_id,
      email: company.email,
      account_status: accountStatus
    };

    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

export default authMiddleware;
