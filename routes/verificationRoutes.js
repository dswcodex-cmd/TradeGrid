import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getMyVerificationDocuments,
  getMyVerificationDocumentById,
  uploadVerificationDocument,
  replaceVerificationDocument
} from "../controllers/verificationController.js";

const router = express.Router();

router.get("/", authMiddleware, getMyVerificationDocuments);
router.get("/:documentId", authMiddleware, getMyVerificationDocumentById);
router.post("/", authMiddleware, uploadVerificationDocument);
router.patch("/:documentId", authMiddleware, replaceVerificationDocument);

export default router;
