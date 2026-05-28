import express from "express";
import {
  sendConnectionRequest,
  acceptConnectionRequest,
  rejectConnectionRequest,
  getPendingRequests,
  getSentPendingRequests,
  getMyConnections,
  getMyNotifications,
  getUnreadNotificationCount,
  markNotificationAsRead,
  markAllNotificationsAsRead
} from "../connectControllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  signup,
  login,
  sendEmailVerification,
  verifyEmailCode,
  sendPasswordResetCode,
  resetPasswordWithCode
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/send-email-verification", sendEmailVerification);
router.post("/verify-email-code", verifyEmailCode);
router.post("/forgot-password/send-code", sendPasswordResetCode);
router.post("/forgot-password/reset", resetPasswordWithCode);
router.post("/request", authMiddleware, sendConnectionRequest);
router.post("/accept", authMiddleware, acceptConnectionRequest);
router.post("/reject", authMiddleware, rejectConnectionRequest);
router.get("/pending", authMiddleware, getPendingRequests);
router.get("/pending-sent", authMiddleware, getSentPendingRequests);
router.get("/", authMiddleware, getMyConnections);
router.get("/notifications", authMiddleware, getMyNotifications);
router.get("/notifications/unread-count", authMiddleware, getUnreadNotificationCount);
router.patch("/notifications/:notificationId/read", authMiddleware, markNotificationAsRead);
router.patch("/notifications/read-all", authMiddleware, markAllNotificationsAsRead);

export default router;
