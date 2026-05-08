import jwt from "jsonwebtoken";
import prisma from "../prismaClient.js";

const adminMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Admin bearer token is required" });
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ error: "JWT_SECRET is not configured" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded?.role !== "superadmin" && decoded?.role !== "admin" && decoded?.role !== "employee") {
      return res.status(403).json({ error: "Invalid admin token" });
    }

    const admin = await prisma.admin.findUnique({
      where: {
        admin_id: Number(decoded.admin_id)
      }
    });

    if (!admin || !admin.is_active) {
      return res.status(403).json({ error: "Admin account is inactive or missing" });
    }

    req.admin = {
      admin_id: admin.admin_id,
      email: admin.email,
      role: admin.role,
      full_name: admin.full_name
    };

    return next();
  } catch {
    return res.status(401).json({ error: "Invalid admin token" });
  }
};

export const requireAdminRole = (...allowedRoles) => (req, res, next) => {
  if (!req.admin) {
    return res.status(401).json({ error: "Admin authentication is required" });
  }

  if (!allowedRoles.includes(req.admin.role)) {
    return res.status(403).json({ error: "You do not have permission to perform this action" });
  }

  return next();
};

export default adminMiddleware;
