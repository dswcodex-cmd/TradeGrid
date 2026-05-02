const startRoundTimer = (io, matchId, userA, userB, eventId, durationSeconds = 180) => {
  let remaining = durationSeconds;

  const interval = setInterval(async () => {
    remaining--;

    
    io.to(`user:${userA}`).emit('round_tick', { remaining, matchId });
    io.to(`user:${userB}`).emit('round_tick', { remaining, matchId });

    if (remaining <= 0) {
      clearInterval(interval);

      
      io.to(`user:${userA}`).emit('round_over', { matchId });
      io.to(`user:${userB}`).emit('round_over', { matchId });

      
      await updateStatus(eventId, userA, 'post_match');
      await updateStatus(eventId, userB, 'post_match');
    }
  }, 1000);

  return interval;
};