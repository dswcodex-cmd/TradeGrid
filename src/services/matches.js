import { dequeueTwo, joinQueue } from './queueService.js';
import { createRoomToken } from './twilioService.js';
import db from '../models/db.js';

export const updateStatus = async (eventId, userId, status) => {
  await db.query(
    `UPDATE registrations SET status = $1
     WHERE event_id = $2 AND user_id = $3`,
    [status, eventId, userId]
  );
};

export const runMatchmaker = async (io, eventId) => {
  const queue = await getUsersInQueue(eventId);

  if (queue.length < 2) return;

  const [userA, userB] = await dequeueTwo(eventId);
  if (!userA || !userB) return;

  const roomName = `trade-pulse-${eventId}-${userA}-${userB}-${Date.now()}`;

  const tokenA = createRoomToken(userA, roomName);
  const tokenB = createRoomToken(userB, roomName);

  const match = await db.query(
    `INSERT INTO scheduled_matches
     (event_id, user_a, user_b, twilio_room_name)
     VALUES ($1, $2, $3, $4) RETURNING id`,
    [eventId, userA, userB, roomName]
  );

  const matchId = match.rows[0].id;

  await updateStatus(eventId, userA, 'matched');
  await updateStatus(eventId, userB, 'matched');

  io.to(`user:${userA}`).emit('match_found', {
    matchId,
    partnerId: userB,
    roomName,
    twilioToken: tokenA
  });

  io.to(`user:${userB}`).emit('match_found', {
    matchId,
    partnerId: userA,
    roomName,
    twilioToken: tokenB
  });
};