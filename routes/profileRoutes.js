import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getMyProfile,
  getMyProfileViewStats,
  getMyMatchActivityStats,
  getTopPartnerCountries,
  completeOnboardingProfile,
  updateMyProfile,
  deleteMyProfile
} from "../controllers/profileController.js";

const router = express.Router();

router.get("/me", authMiddleware, getMyProfile);
router.get("/views/stats", authMiddleware, getMyProfileViewStats);
router.get("/matches/stats", authMiddleware, getMyMatchActivityStats);
router.get("/matches/top-countries", authMiddleware, getTopPartnerCountries);
router.patch("/me", authMiddleware, updateMyProfile);
router.delete("/me", authMiddleware, deleteMyProfile);
router.post("/complete", authMiddleware, completeOnboardingProfile);

export default router;
