require('dotenv').config();
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const connectDB = require('./db');
require('./models/User');

const app = express();

app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

connectDB();

app.get('/', (req, res) => {
  res.json({ message: 'API ToDo MongoDB fonctionne !' });
});

const taskRoutes = require('./routes/tasks');
app.use('/tasks', taskRoutes);

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const uploadRoutes = require('./routes/upload');
app.use('/upload', uploadRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});