import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createOrGetConversation,
  getMyConversations,
  getConversationMessages,
  sendMessage,
  markConversationAsRead
} from "../controllers/messageController.js";

const router = express.Router();

router.post("/conversations", authMiddleware, createOrGetConversation);
router.get("/conversations", authMiddleware, getMyConversations);
router.get("/conversations/:conversationId", authMiddleware, getConversationMessages);
router.post("/conversations/:conversationId/messages", authMiddleware, sendMessage);
router.patch("/conversations/:conversationId/read", authMiddleware, markConversationAsRead);

export default router;
