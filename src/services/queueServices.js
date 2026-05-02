import { createClient } from 'redis';

const client = createClient({ url: process.env.REDIS_URL });

client.on('error', (err) => console.error('Redis error:', err));
await client.connect();

const QUEUE_KEY = (eventId) => `queue:event:${eventId}`;

export const joinQueue = async (eventId, userId) => {
  await client.lPush(QUEUE_KEY(eventId), userId);
  await updateStatus(eventId, userId, 'waiting');
  return getUsersInQueue(eventId);
};

export const getUsersInQueue = async (eventId) => {
  return await client.lRange(QUEUE_KEY(eventId), 0, -1);
};

export const dequeueTwo = async (eventId) => {
  const userA = await client.rPop(QUEUE_KEY(eventId));
  const userB = await client.rPop(QUEUE_KEY(eventId));
  return [userA, userB];
};

export const removeFromQueue = async (eventId, userId) => {
  await client.lRem(QUEUE_KEY(eventId), 0, userId);
};