import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getMyWatchlist,
  addProductToWatchlist,
  removeProductFromWatchlist
} from "../controllers/watchlistController.js";

const router = express.Router();

router.get("/", authMiddleware, getMyWatchlist);
router.post("/", authMiddleware, addProductToWatchlist);
router.delete("/:productId", authMiddleware, removeProductFromWatchlist);

export default router;
