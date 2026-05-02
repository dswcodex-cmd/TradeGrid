const redis = require('redis');
const client = redis.createClient({ url: process.env.REDIS_URL });

const QUEUE_KEY = (eventId) => `queue:event:${eventId}`;

const joinQueue = async (eventId, userId) => {
  await client.lPush(QUEUE_KEY(eventId), userId);
  await updateStatus(eventId, userId, 'waiting');
  return getUsersInQueue(eventId);
};

const getUsersInQueue = async (eventId) => {
  return await client.lRange(QUEUE_KEY(eventId), 0, -1);
};

const dequeueTwo = async (eventId) => {
  const userA = await client.rPop(QUEUE_KEY(eventId));
  const userB = await client.rPop(QUEUE_KEY(eventId));
  return [userA, userB];
};

const removeFromQueue = async (eventId, userId) => {
  await client.lRem(QUEUE_KEY(eventId), 0, userId);
};