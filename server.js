import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

import('./sockets/eventSocket.js').then(({ default: eventSocket }) => {
  eventSocket(io);
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});