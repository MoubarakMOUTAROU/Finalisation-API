require('dotenv').config();
const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connecté à MongoDB Atlas');
  } catch (err) {
    console.error('❌ Erreur :', err.message);
    process.exit(1);
  }
}

module.exports = connectDB;