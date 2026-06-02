import jwt from "jsonwebtoken";
import { joinQueue, leaveQueue } from "../src/services/eventQueueService.js";
import {
  markMeetingEnded,
  markMeetingStarted,
  maybeRunMatchmaker,
  skipCurrentMatch,
  updateRegistrationStatus
} from "../src/services/eventMatchService.js";

const verifySocketToken = (token) => jwt.verify(token, process.env.JWT_SECRET);

const emitStatus = (socket, status, extra = {}) => {
  socket.emit("status_update", {
    status,
    ...extra
  });
};

const registerEventSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("register_user", async ({ token, eventId }) => {
      try {
        if (!token || !eventId) {
          emitStatus(socket, "error", { message: "token and eventId are required" });
          return;
        }

        const decoded = verifySocketToken(token);
        const companyId = Number(decoded.company_id);

        socket.data = {
          companyId,
          eventId: String(eventId)
        };

        socket.join(`company:${companyId}`);
        socket.join(`event:${eventId}`);

        emitStatus(socket, "connected", {
          companyId,
          eventId: String(eventId)
        });
      } catch (error) {
        emitStatus(socket, "error", { message: "Invalid socket token" });
      }
    });

    socket.on("enter_queue", async () => {
      const { companyId, eventId } = socket.data || {};

      if (!companyId || !eventId) {
        emitStatus(socket, "error", { message: "Register the socket before entering queue" });
        return;
      }

      const queue = joinQueue(eventId, companyId);
      await updateRegistrationStatus(eventId, companyId, "WAITING");

      emitStatus(socket, "waiting", {
        queueLength: queue.length
      });

      await maybeRunMatchmaker(io, eventId);
    });

    socket.on("leave_queue", async () => {
      const { companyId, eventId } = socket.data || {};

      if (!companyId || !eventId) {
        return;
      }

      leaveQueue(eventId, companyId);
      await updateRegistrationStatus(eventId, companyId, "CONNECTED");
      emitStatus(socket, "connected");
    });

    socket.on("meeting_started", async ({ matchId }) => {
      const { companyId } = socket.data || {};

      if (!companyId || !matchId) {
        return;
      }

      const match = await markMeetingStarted(matchId, companyId);

      if (!match) {
        emitStatus(socket, "error", { message: "Match not found" });
        return;
      }

      emitStatus(socket, "in_meeting", { matchId: match.id });
    });

    socket.on("meeting_ended", async ({ matchId }) => {
      if (!matchId) {
        return;
      }

      const match = await markMeetingEnded(matchId);

      if (!match) {
        emitStatus(socket, "error", { message: "Match not found" });
        return;
      }

      io.to(`company:${match.company_a_id}`).emit("status_update", {
        status: "post_match",
        matchId: match.id
      });

      io.to(`company:${match.company_b_id}`).emit("status_update", {
        status: "post_match",
        matchId: match.id
      });
    });

    socket.on("skip_match", async ({ matchId }) => {
      const { companyId } = socket.data || {};

      if (!companyId || !matchId) {
        return;
      }

      const match = await skipCurrentMatch(io, matchId, companyId);

      if (!match) {
        emitStatus(socket, "error", { message: "Match not found" });
      }
    });

    socket.on("disconnect", async () => {
      const { companyId, eventId } = socket.data || {};

      if (companyId && eventId) {
        leaveQueue(eventId, companyId);
      }

      console.log("Socket disconnected:", socket.id);
    });
  });
};

export default registerEventSocket;
