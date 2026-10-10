require('dotenv').config();
const express = require('express');
const connectDB = require('./db');
require('./models/User');

const app = express();

app.use(express.json());

connectDB();

app.get('/', (req, res) => {
  res.json({ message: 'API ToDo MongoDB fonctionne !' });
});

const taskRoutes = require('./routes/tasks');
app.use('/tasks', taskRoutes);

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Serveur démarré sur http://localhost:${PORT}`);
});