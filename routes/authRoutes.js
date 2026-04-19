import express from "express";
import {
  sendConnectionRequest,
  acceptConnectionRequest,
  rejectConnectionRequest,
  getPendingRequests,
  getMyConnections,
  getMyNotifications
} from "../connectControllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { signup, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/request", authMiddleware, sendConnectionRequest);
router.post("/accept", authMiddleware, acceptConnectionRequest);
router.post("/reject", authMiddleware, rejectConnectionRequest);
router.get("/pending", authMiddleware, getPendingRequests);
router.get("/", authMiddleware, getMyConnections);
router.get("/notifications", authMiddleware, getMyNotifications);

export default router;
