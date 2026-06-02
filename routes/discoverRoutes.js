import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  discoverCompaniesByImage,
  discoverCompanies,
  getPublicCompanyProfile
} from "../controllers/discoverController.js";

const router = express.Router();

router.post("/image-search", authMiddleware, discoverCompaniesByImage);
router.get("/", authMiddleware, discoverCompanies);
router.get("/:companyId", authMiddleware, getPublicCompanyProfile);

export default router;
