import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createSupportTicket,
  getMySupportTickets,
  getMySupportTicketById,
  replyToMySupportTicket
} from "../controllers/supportController.js";

const router = express.Router();

router.post("/tickets", authMiddleware, createSupportTicket);
router.get("/tickets", authMiddleware, getMySupportTickets);
router.get("/tickets/:ticketId", authMiddleware, getMySupportTicketById);
router.post("/tickets/:ticketId/messages", authMiddleware, replyToMySupportTicket);

export default router;
