require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./db');
const User = require('./models/User');
const Task = require('./models/Task');

(async () => {
  await connectDB();

  try {
    // Supprimer Bob et Charlie s'ils existent déjà
    await User.deleteMany({ email: { $in: ['bob@example.com', 'charlie@example.com'] } });
    await Task.deleteMany({ titre: { $in: ['Faire les courses', 'Réviser JavaScript'] } });

    const bob = await User.create({
      nom: 'Bob',
      email: 'bob@example.com',
      age: 30
    });

    const charlie = await User.create({
      nom: 'Charlie',
      email: 'charlie@example.com',
      age: 35
    });

    console.log('Bob créé :', bob._id);
    console.log('Charlie créé :', charlie._id);

    await Task.create({
      titre: 'Faire les courses',
      description: 'Acheter du pain et du lait',
      user: bob._id
    });

    await Task.create({
      titre: 'Réviser JavaScript',
      description: 'Chapitre sur les promesses',
      statut: 'en cours',
      user: charlie._id
    });

    console.log('Tâches créées pour Bob et Charlie');

  } catch (err) {
    console.error('Erreur :', err.message);
  }

  process.exit(0);
})();