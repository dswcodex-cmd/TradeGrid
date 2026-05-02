const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(express.json());


// Serve Speed-dating-page folder
app.use(express.static(path.join(__dirname, 'Speed-dating-page')));

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Speed-dating-page', 'speed-date.html'));
});

require('./sockets/eventSocket')(io);

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});