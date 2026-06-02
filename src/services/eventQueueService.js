const eventQueues = new Map();
const activeRoundTimers = new Map();

const getQueueForEvent = (eventId) => {
  const key = String(eventId);

  if (!eventQueues.has(key)) {
    eventQueues.set(key, []);
  }

  return eventQueues.get(key);
};

export const joinQueue = (eventId, companyId) => {
  const queue = getQueueForEvent(eventId);
  const normalizedCompanyId = Number(companyId);

  if (!queue.includes(normalizedCompanyId)) {
    queue.push(normalizedCompanyId);
  }

  return [...queue];
};

export const leaveQueue = (eventId, companyId) => {
  const queue = getQueueForEvent(eventId);
  const normalizedCompanyId = Number(companyId);
  const nextQueue = queue.filter((queuedCompanyId) => queuedCompanyId !== normalizedCompanyId);

  eventQueues.set(String(eventId), nextQueue);
  return [...nextQueue];
};

export const getQueueSnapshot = (eventId) => [...getQueueForEvent(eventId)];

export const dequeuePair = (eventId) => {
  const queue = getQueueForEvent(eventId);

  if (queue.length < 2) {
    return [null, null];
  }

  const companyAId = queue.shift() ?? null;
  const companyBId = queue.shift() ?? null;

  eventQueues.set(String(eventId), queue);
  return [companyAId, companyBId];
};

export const setMatchTimer = (matchId, timerRef) => {
  activeRoundTimers.set(String(matchId), timerRef);
};

export const clearMatchTimer = (matchId) => {
  const key = String(matchId);
  const timerRef = activeRoundTimers.get(key);

  if (timerRef) {
    clearInterval(timerRef);
    activeRoundTimers.delete(key);
  }
};

export const clearEventQueue = (eventId) => {
  eventQueues.delete(String(eventId));
};
