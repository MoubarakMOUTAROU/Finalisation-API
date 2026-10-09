const connectDB = require('./db');
const User = require('./User');

(async () => {
  await connectDB();

  const alice = await User.create({ nom: 'Alice', age: 25, ville: 'Paris' });
  console.log('Créé :', alice);

  const users = await User.find();
  console.log('Liste :', users);

  process.exit(0);
})();