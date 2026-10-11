const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

const rooms = ['Général', 'Tech', 'Sport', 'Musique'];

io.on('connection', (socket) => {
  console.log('Connexion :', socket.id);

  socket.emit('rooms list', rooms);

  socket.on('join room', ({ username, room }) => {
    socket.join(room);
    socket.username = username;
    socket.room = room;

    console.log(`👤 ${username} a rejoint la room "${room}"`);

    socket.emit('joined', { username, room });

    socket.to(room).emit('user joined', {
      username,
      message: `${username} a rejoint la room`
    });

    io.to(room).emit('room users', getRoomUsers(room));
  });

  socket.on('chat message', ({ room, message }) => {
    io.to(room).emit('chat message', {
      username: socket.username,
      message,
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    });
  });

  socket.on('leave room', () => {
    if (socket.room) {
      const room = socket.room;
      const username = socket.username;

      socket.leave(room);

      socket.to(room).emit('user left', {
        username,
        message: `${username} a quitté la room`
      });

      io.to(room).emit('room users', getRoomUsers(room));
      console.log(`👋 ${username} a quitté la room "${room}"`);

      socket.room = null;
    }
  });

  socket.on('disconnect', () => {
    if (socket.room) {
      const room = socket.room;
      const username = socket.username;

      socket.to(room).emit('user left', {
        username,
        message: `${username} a quitté la room`
      });

      io.to(room).emit('room users', getRoomUsers(room));
    }
    console.log('❌ Déconnexion :', socket.id);
  });
});

function getRoomUsers(room) {
  const clients = io.sockets.adapter.rooms.get(room);
  if (!clients) return [];

  const users = [];
  for (const clientId of clients) {
    const clientSocket = io.sockets.sockets.get(clientId);
    if (clientSocket && clientSocket.username) {
      users.push(clientSocket.username);
    }
  }
  return users;
}

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Serveur de chat démarré sur http://localhost:${PORT}`);
});