require('dotenv').config();
const connectDB = require('./db');
const User = require('./models/User');
const Task = require('./models/Task');

(async () => {
  await connectDB();
  await User.deleteMany({});
  await Task.deleteMany({});
  console.log('Base nettoyée');
  process.exit(0);
})();