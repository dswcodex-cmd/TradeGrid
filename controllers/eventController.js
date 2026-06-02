import prisma from "../prismaClient.js";

const FRIDAY_INDEX = 5;
const PULSE_TITLE_PREFIX = "Pulse Network";
const PULSE_INDUSTRY = "Cross-industry";
const isPulseBypassEnabled = () => process.env.PULSE_DEV_BYPASS === "true";

const getJohannesburgParts = () => {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Johannesburg",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short"
  });

  const parts = formatter.formatToParts(new Date());
  const map = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return {
    year: Number(map.year),
    month: Number(map.month),
    day: Number(map.day),
    weekday: map.weekday
  };
};

const getJohannesburgWeekdayIndex = () => {
  const weekday = getJohannesburgParts().weekday;
  const indexes = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6
  };

  return indexes[weekday];
};

const getCurrentWeekFridayRange = () => {
  const { year, month, day } = getJohannesburgParts();
  const johannesburgTodayUtc = new Date(Date.UTC(year, month - 1, day));
  const currentDay = getJohannesburgWeekdayIndex();
  const deltaToFriday = FRIDAY_INDEX - currentDay;
  const fridayUtc = new Date(johannesburgTodayUtc);
  fridayUtc.setUTCDate(johannesburgTodayUtc.getUTCDate() + deltaToFriday);

  const fridayStart = new Date(Date.UTC(
    fridayUtc.getUTCFullYear(),
    fridayUtc.getUTCMonth(),
    fridayUtc.getUTCDate(),
    0,
    0,
    0,
    0
  ));
  const fridayEnd = new Date(Date.UTC(
    fridayUtc.getUTCFullYear(),
    fridayUtc.getUTCMonth(),
    fridayUtc.getUTCDate(),
    23,
    59,
    59,
    999
  ));

  return { fridayStart, fridayEnd };
};

const isPulseOpenNow = () =>
  isPulseBypassEnabled() || getJohannesburgWeekdayIndex() === FRIDAY_INDEX;

const getPulseTitleForDate = (date) => {
  const label = date.toISOString().slice(0, 10);
  return `${PULSE_TITLE_PREFIX} ${label}`;
};

const ensureWeeklyPulseEvent = async () => {
  const { fridayStart, fridayEnd } = getCurrentWeekFridayRange();
  const title = getPulseTitleForDate(fridayStart);

  const existing = await prisma.event.findFirst({
    where: {
      title,
      event_date: {
        gte: fridayStart,
        lte: fridayEnd
      }
    }
  });

  if (existing) {
    const targetStatus = isPulseOpenNow() ? "LIVE" : "UPCOMING";

    if (existing.status !== targetStatus) {
      return prisma.event.update({
        where: { id: existing.id },
        data: {
          status: targetStatus
        }
      });
    }

    return existing;
  }

  return prisma.event.create({
    data: {
      title,
      industry: PULSE_INDUSTRY,
      description: "Weekly random pulse networking session for TradeGrid companies.",
      event_date: fridayStart,
      status: isPulseOpenNow() ? "LIVE" : "UPCOMING",
      total_rounds: 12,
      round_duration_secs: 180,
      break_duration_secs: 120
    }
  });
};

const serializeEvent = (event) => ({
  id: event.id,
  title: event.title,
  industry: event.industry,
  description: event.description,
  event_date: event.event_date,
  status: event.status,
  total_rounds: event.total_rounds,
  round_duration_secs: event.round_duration_secs,
  break_duration_secs: event.break_duration_secs,
  current_round: event.current_round,
  created_at: event.created_at
});

const serializeScheduledMatch = (match, currentCompanyId) => {
  const partner =
    match.company_a_id === currentCompanyId ? match.company_b : match.company_a;

  return {
    id: match.id,
    event_id: match.event_id,
    round_number: match.round_number,
    compatibility_score: match.compatibility_score,
    twilio_room_name: match.twilio_room_name,
    started_at: match.started_at,
    ended_at: match.ended_at,
    partner: partner
      ? {
          company_id: partner.company_id,
          company_name: partner.company_name,
          business_type: partner.business_type,
          country: partner.location?.country || null,
          industry: partner.industry?.industry_name || null,
          products: partner.products.map((item) => item.product.product_name)
        }
      : null
  };
};

export const getEvents = async (req, res) => {
  try {
    const { status } = req.query;

    const events = await prisma.event.findMany({
      where: status ? { status: String(status).toUpperCase() } : undefined,
      orderBy: {
        event_date: "asc"
      }
    });

    return res.status(200).json({
      events: events.map(serializeEvent)
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getCurrentPulseSession = async (req, res) => {
  try {
    if (!isPulseOpenNow()) {
      return res.status(200).json({
        pulse_session: null,
        open_now: false,
        bypass_enabled: false
      });
    }

    const pulseEvent = await ensureWeeklyPulseEvent();

    return res.status(200).json({
      pulse_session: serializeEvent(pulseEvent),
      open_now: isPulseOpenNow(),
      bypass_enabled: isPulseBypassEnabled()
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getEventById = async (req, res) => {
  try {
    const currentCompanyId = Number(req.company.company_id);
    const { eventId } = req.params;

    const event = await prisma.event.findUnique({
      where: { id: String(eventId) },
      include: {
        registrations: {
          where: {
            company_id: currentCompanyId
          }
        },
        messages: {
          orderBy: {
            created_at: "asc"
          },
          include: {
            company: {
              select: {
                company_id: true,
                company_name: true
              }
            }
          }
        },
        matches: {
          where: {
            OR: [
              { company_a_id: currentCompanyId },
              { company_b_id: currentCompanyId }
            ]
          },
          include: {
            company_a: {
              include: {
                location: true,
                industry: true,
                products: {
                  include: {
                    product: true
                  }
                }
              }
            },
            company_b: {
              include: {
                location: true,
                industry: true,
                products: {
                  include: {
                    product: true
                  }
                }
              }
            }
          },
          orderBy: {
            created_at: "desc"
          }
        }
      }
    });

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    const registration = event.registrations[0] || null;

    return res.status(200).json({
      event: serializeEvent(event),
      registration,
      scheduled_matches: event.matches.map((match) =>
        serializeScheduledMatch(match, currentCompanyId)
      ),
      lobby_messages: event.messages.map((message) => ({
        id: message.id,
        message: message.message,
        created_at: message.created_at,
        company: message.company
      }))
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const registerForEvent = async (req, res) => {
  try {
    const currentCompanyId = Number(req.company.company_id);
    const { eventId } = req.params;
    const {
      offering = null,
      target_markets = [],
      session_preference = "FULL_DAY"
    } = req.body;

    const event = await prisma.event.findUnique({
      where: { id: String(eventId) }
    });

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    const registration = await prisma.registration.upsert({
      where: {
        company_id_event_id: {
          company_id: currentCompanyId,
          event_id: String(eventId)
        }
      },
      update: {
        offering,
        target_markets: Array.isArray(target_markets) ? target_markets : [],
        session_preference
      },
      create: {
        company_id: currentCompanyId,
        event_id: String(eventId),
        offering,
        target_markets: Array.isArray(target_markets) ? target_markets : [],
        session_preference
      }
    });

    return res.status(200).json({
      message: "Registered for event successfully",
      registration
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const joinCurrentPulseSession = async (req, res) => {
  try {
    if (!isPulseOpenNow()) {
      return res.status(403).json({
        error: "Pulse networking opens on Fridays only"
      });
    }

    const currentCompanyId = Number(req.company.company_id);
    const { offering = null, target_markets = [], session_preference = "FULL_DAY" } = req.body;
    const pulseEvent = await ensureWeeklyPulseEvent();

    const registration = await prisma.registration.upsert({
      where: {
        company_id_event_id: {
          company_id: currentCompanyId,
          event_id: pulseEvent.id
        }
      },
      update: {
        offering,
        target_markets: Array.isArray(target_markets) ? target_markets : [],
        session_preference,
        status: "CONNECTED"
      },
      create: {
        company_id: currentCompanyId,
        event_id: pulseEvent.id,
        offering,
        target_markets: Array.isArray(target_markets) ? target_markets : [],
        session_preference,
        status: "CONNECTED"
      }
    });

    return res.status(200).json({
      message: "Joined current pulse session",
      pulse_session: serializeEvent(pulseEvent),
      bypass_enabled: isPulseBypassEnabled(),
      registration
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getLobbyMessages = async (req, res) => {
  try {
    const { eventId } = req.params;

    const messages = await prisma.lobbyMessage.findMany({
      where: {
        event_id: String(eventId)
      },
      include: {
        company: {
          select: {
            company_id: true,
            company_name: true
          }
        }
      },
      orderBy: {
        created_at: "asc"
      }
    });

    return res.status(200).json({ messages });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const postLobbyMessage = async (req, res) => {
  try {
    const currentCompanyId = Number(req.company.company_id);
    const { eventId } = req.params;
    const { message } = req.body;

    if (!message?.trim()) {
      return res.status(400).json({ error: "message is required" });
    }

    const created = await prisma.lobbyMessage.create({
      data: {
        event_id: String(eventId),
        company_id: currentCompanyId,
        message: String(message).trim()
      },
      include: {
        company: {
          select: {
            company_id: true,
            company_name: true
          }
        }
      }
    });

    return res.status(201).json({
      message: "Lobby message sent",
      lobby_message: created
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const submitMatchOutcome = async (req, res) => {
  try {
    const currentCompanyId = Number(req.company.company_id);
    const { matchId } = req.params;
    const { decision, notes = null, rating = null } = req.body;

    if (!["YES", "NO", "MAYBE"].includes(String(decision || "").toUpperCase())) {
      return res.status(400).json({ error: "decision must be YES, NO, or MAYBE" });
    }

    const match = await prisma.scheduledMatch.findUnique({
      where: { id: String(matchId) }
    });

    if (!match) {
      return res.status(404).json({ error: "Match not found" });
    }

    if (![match.company_a_id, match.company_b_id].includes(currentCompanyId)) {
      return res.status(403).json({ error: "You are not part of this match" });
    }

    const outcome = await prisma.matchOutcome.upsert({
      where: {
        match_id_company_id: {
          match_id: String(matchId),
          company_id: currentCompanyId
        }
      },
      update: {
        decision: String(decision).toUpperCase(),
        notes,
        rating
      },
      create: {
        match_id: String(matchId),
        company_id: currentCompanyId,
        decision: String(decision).toUpperCase(),
        notes,
        rating
      }
    });

    return res.status(200).json({
      message: "Match outcome submitted",
      outcome
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getAdminEvents = async (_req, res) => {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        created_at: "desc"
      }
    });

    return res.status(200).json({
      events: events.map(serializeEvent)
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const createAdminEvent = async (req, res) => {
  try {
    const {
      title,
      industry,
      description = null,
      event_date,
      status = "UPCOMING",
      total_rounds = 12,
      round_duration_secs = 180,
      break_duration_secs = 120
    } = req.body;

    if (!title || !industry || !event_date) {
      return res.status(400).json({
        error: "title, industry, and event_date are required"
      });
    }

    const event = await prisma.event.create({
      data: {
        title,
        industry,
        description,
        event_date: new Date(event_date),
        status: String(status).toUpperCase(),
        total_rounds: Number(total_rounds),
        round_duration_secs: Number(round_duration_secs),
        break_duration_secs: Number(break_duration_secs)
      }
    });

    return res.status(201).json({
      message: "Event created successfully",
      event: serializeEvent(event)
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
