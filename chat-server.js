const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('Un utilisateur est connecté :', socket.id);

  socket.on('chat message', (msg) => {
    console.log('📩 Message reçu :', msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('Un utilisateur est déconnecté :', socket.id);
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Serveur de chat démarré sur http://localhost:${PORT}`);
});