module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Register user to their personal room
    socket.on('register_user', ({ userId, eventId }) => {
      socket.join(`user:${userId}`);
      socket.join(`event:${eventId}`);
      socket.data = { userId, eventId };
      console.log(`User ${userId} joined event ${eventId}`);
    });

    // User enters the matchmaking queue
    socket.on('enter_queue', ({ userId, eventId }) => {
      console.log(`User ${userId} entered queue for event ${eventId}`);
      socket.emit('status_update', { status: 'waiting' });
    });

    // Meeting started
    socket.on('meeting_started', ({ userId, eventId, matchId }) => {
      console.log(`User ${userId} started meeting ${matchId}`);
      socket.emit('status_update', { status: 'in_meeting' });
    });

    // Meeting ended (hang up or timer)
    socket.on('meeting_ended', ({ userId, eventId, matchId }) => {
      console.log(`User ${userId} ended meeting ${matchId}`);
      socket.emit('status_update', { status: 'post_match' });
    });

    // User disconnects
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};