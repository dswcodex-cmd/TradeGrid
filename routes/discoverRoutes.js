import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  discoverCompanies,
  getPublicCompanyProfile
} from "../controllers/discoverController.js";

const router = express.Router();

router.get("/", authMiddleware, discoverCompanies);
router.get("/:companyId", authMiddleware, getPublicCompanyProfile);

export default router;
