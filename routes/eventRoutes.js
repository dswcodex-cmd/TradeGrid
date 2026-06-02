import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getEvents,
  getEventById,
  getCurrentPulseSession,
  joinCurrentPulseSession,
  registerForEvent,
  getLobbyMessages,
  postLobbyMessage,
  submitMatchOutcome
} from "../controllers/eventController.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getEvents);
router.get("/pulse/current", getCurrentPulseSession);
router.post("/pulse/join", joinCurrentPulseSession);
router.get("/:eventId", getEventById);
router.post("/:eventId/register", registerForEvent);
router.get("/:eventId/lobby-messages", getLobbyMessages);
router.post("/:eventId/lobby-messages", postLobbyMessage);
router.post("/matches/:matchId/outcome", submitMatchOutcome);

export default router;
