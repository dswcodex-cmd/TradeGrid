import prisma from "../../prismaClient.js";
import { clearMatchTimer, setMatchTimer } from "./eventQueueService.js";

export const startRoundTimer = ({
  io,
  matchId,
  eventId,
  companyAId,
  companyBId,
  durationSeconds = 180
}) => {
  clearMatchTimer(matchId);

  let remaining = Number(durationSeconds);

  const interval = setInterval(async () => {
    remaining -= 1;

    io.to(`company:${companyAId}`).emit("round_tick", { remaining, matchId, eventId });
    io.to(`company:${companyBId}`).emit("round_tick", { remaining, matchId, eventId });

    if (remaining > 0) {
      return;
    }

    clearMatchTimer(matchId);

    io.to(`company:${companyAId}`).emit("round_over", { matchId, eventId });
    io.to(`company:${companyBId}`).emit("round_over", { matchId, eventId });

    await prisma.$transaction([
      prisma.scheduledMatch.update({
        where: { id: String(matchId) },
        data: {
          ended_at: new Date()
        }
      }),
      prisma.registration.updateMany({
        where: {
          event_id: String(eventId),
          company_id: {
            in: [Number(companyAId), Number(companyBId)]
          }
        },
        data: {
          status: "POST_MATCH"
        }
      })
    ]);
  }, 1000);

  setMatchTimer(matchId, interval);
  return interval;
};
