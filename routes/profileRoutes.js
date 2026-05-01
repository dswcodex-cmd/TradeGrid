import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getMyProfile,
  completeOnboardingProfile,
  updateMyProfile,
  deleteMyProfile
} from "../controllers/profileController.js";

const router = express.Router();

router.get("/me", authMiddleware, getMyProfile);
router.patch("/me", authMiddleware, updateMyProfile);
router.delete("/me", authMiddleware, deleteMyProfile);
router.post("/complete", authMiddleware, completeOnboardingProfile);

export default router;
