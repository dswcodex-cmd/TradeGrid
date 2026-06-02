import prisma from "../../prismaClient.js";
import { clearMatchTimer, dequeuePair, getQueueSnapshot, joinQueue } from "./eventQueueService.js";
import { createRoomToken } from "./twilioVideoService.js";
import { startRoundTimer } from "./roundTimer.js";

export const updateRegistrationStatus = async (eventId, companyId, status) => {
  await prisma.registration.updateMany({
    where: {
      event_id: String(eventId),
      company_id: Number(companyId)
    },
    data: {
      status
    }
  });
};

const getCompanyEventContext = async (eventId, companyIds) =>
  prisma.company.findMany({
    where: {
      company_id: {
        in: companyIds.map(Number)
      }
    },
    include: {
      location: true,
      industry: true,
      products: {
        include: {
          product: true
        }
      }
    }
  });

export const maybeRunMatchmaker = async (io, eventId) => {
  const queueSnapshot = getQueueSnapshot(eventId);

  if (queueSnapshot.length < 2) {
    return null;
  }

  const event = await prisma.event.findUnique({
    where: { id: String(eventId) }
  });

  if (!event || event.status === "CLOSED") {
    return null;
  }

  const [companyAId, companyBId] = dequeuePair(eventId);

  if (!companyAId || !companyBId) {
    return null;
  }

  const roomName = `trade-pulse-${eventId}-${companyAId}-${companyBId}-${Date.now()}`;
  const companies = await getCompanyEventContext(eventId, [companyAId, companyBId]);
  const companyA = companies.find((company) => company.company_id === Number(companyAId));
  const companyB = companies.find((company) => company.company_id === Number(companyBId));

  const [match] = await prisma.$transaction([
    prisma.scheduledMatch.create({
      data: {
        event_id: String(eventId),
        company_a_id: Number(companyAId),
        company_b_id: Number(companyBId),
        round_number: event.current_round > 0 ? event.current_round : 1,
        compatibility_score: null,
        twilio_room_name: roomName,
        started_at: new Date()
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
        status: "MATCHED"
      }
    }),
    prisma.event.update({
      where: { id: String(eventId) },
      data: {
        current_round: event.current_round > 0 ? event.current_round : 1
      }
    })
  ]);

  const tokenA = createRoomToken(String(companyAId), roomName);
  const tokenB = createRoomToken(String(companyBId), roomName);

  io.to(`company:${companyAId}`).emit("match_found", {
    matchId: match.id,
    partner: companyB
      ? {
          company_id: companyB.company_id,
          company_name: companyB.company_name,
          country: companyB.location?.country || "N/A",
          industry: companyB.industry?.industry_name || "N/A",
          products: companyB.products.map((item) => item.product.product_name),
          business_type: companyB.business_type
        }
      : null,
    roomName,
    twilioToken: tokenA,
    roundDurationSeconds: event.round_duration_secs
  });

  io.to(`company:${companyBId}`).emit("match_found", {
    matchId: match.id,
    partner: companyA
      ? {
          company_id: companyA.company_id,
          company_name: companyA.company_name,
          country: companyA.location?.country || "N/A",
          industry: companyA.industry?.industry_name || "N/A",
          products: companyA.products.map((item) => item.product.product_name),
          business_type: companyA.business_type
        }
      : null,
    roomName,
    twilioToken: tokenB,
    roundDurationSeconds: event.round_duration_secs
  });

  startRoundTimer({
    io,
    matchId: match.id,
    eventId,
    companyAId,
    companyBId,
    durationSeconds: event.round_duration_secs
  });

  return match;
};

export const markMeetingStarted = async (matchId, companyId) => {
  const match = await prisma.scheduledMatch.findUnique({
    where: { id: String(matchId) }
  });

  if (!match) {
    return null;
  }

  await prisma.registration.updateMany({
    where: {
      event_id: match.event_id,
      company_id: Number(companyId)
    },
    data: {
      status: "IN_MEETING"
    }
  });

  return match;
};

export const markMeetingEnded = async (matchId) => {
  const match = await prisma.scheduledMatch.findUnique({
    where: { id: String(matchId) }
  });

  if (!match) {
    return null;
  }

  clearMatchTimer(matchId);

  await prisma.$transaction([
    prisma.scheduledMatch.update({
      where: { id: String(matchId) },
      data: {
        ended_at: new Date()
      }
    }),
    prisma.registration.updateMany({
      where: {
        event_id: match.event_id,
        company_id: {
          in: [match.company_a_id, match.company_b_id]
        }
      },
      data: {
        status: "POST_MATCH"
      }
    })
  ]);

  return match;
};

export const skipCurrentMatch = async (io, matchId, skippedByCompanyId) => {
  const match = await prisma.scheduledMatch.findUnique({
    where: { id: String(matchId) }
  });

  if (!match) {
    return null;
  }

  clearMatchTimer(matchId);

  await prisma.$transaction([
    prisma.scheduledMatch.update({
      where: { id: String(matchId) },
      data: {
        ended_at: new Date()
      }
    }),
    prisma.registration.updateMany({
      where: {
        event_id: match.event_id,
        company_id: {
          in: [match.company_a_id, match.company_b_id]
        }
      },
      data: {
        status: "WAITING"
      }
    })
  ]);

  joinQueue(match.event_id, match.company_a_id);
  joinQueue(match.event_id, match.company_b_id);

  io.to(`company:${match.company_a_id}`).emit("match_skipped", {
    matchId: match.id,
    skipped_by_company_id: Number(skippedByCompanyId)
  });
  io.to(`company:${match.company_b_id}`).emit("match_skipped", {
    matchId: match.id,
    skipped_by_company_id: Number(skippedByCompanyId)
  });

  await maybeRunMatchmaker(io, match.event_id);
  return match;
};
