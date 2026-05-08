import express from "express";
import adminMiddleware, { requireAdminRole } from "../middleware/adminMiddleware.js";
import {
  bootstrapAdmin,
  adminLogin,
  getMyAdminProfile,
  getAdminStaff,
  createAdminStaff,
  updateAdminStaff,
  getAdminCompanies,
  getAdminCompanyById,
  updateAdminCompany,
  deleteAdminCompany,
  getAdminVerificationDocuments,
  reviewVerificationDocument
} from "../controllers/adminController.js";
import {
  getAdminSupportTickets,
  getAdminSupportTicketById,
  assignSupportTicket,
  updateSupportTicketStatus,
  replyToSupportTicketAsStaff
} from "../controllers/supportController.js";

const router = express.Router();

router.post("/bootstrap", bootstrapAdmin);
router.post("/login", adminLogin);

router.use(adminMiddleware);

router.get("/me", getMyAdminProfile);
router.get("/staff", requireAdminRole("superadmin"), getAdminStaff);
router.post("/staff", requireAdminRole("superadmin"), createAdminStaff);
router.patch("/staff/:adminId", requireAdminRole("superadmin"), updateAdminStaff);
router.get("/companies", getAdminCompanies);
router.get("/companies/:companyId", getAdminCompanyById);
router.patch("/companies/:companyId", updateAdminCompany);
router.delete("/companies/:companyId", deleteAdminCompany);
router.get("/verification", getAdminVerificationDocuments);
router.patch("/verification/:documentId/review", reviewVerificationDocument);
router.get("/support/tickets", getAdminSupportTickets);
router.get("/support/tickets/:ticketId", getAdminSupportTicketById);
router.patch("/support/tickets/:ticketId/assign", assignSupportTicket);
router.patch("/support/tickets/:ticketId/status", updateSupportTicketStatus);
router.post("/support/tickets/:ticketId/messages", replyToSupportTicketAsStaff);

export default router;
