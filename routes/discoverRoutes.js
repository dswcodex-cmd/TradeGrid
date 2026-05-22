import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  discoverCompaniesByImage,
  discoverCompanies,
  getPublicCompanyProfile
} from "../controllers/discoverController.js";

const router = express.Router();

/*
  PUBLIC ROUTES
*/
router.get("/", discoverCompanies);
router.get("/:companyId", getPublicCompanyProfile);

/*
  PROTECTED ROUTES
*/
router.post(
  "/image-search",
  authMiddleware,
  discoverCompaniesByImage
);

export default router;