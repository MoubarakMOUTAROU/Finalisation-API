const connectDB = require('./db');
const User = require('./models/User');
const Task = require('./models/Task');

(async () => {
  await connectDB();

  try {
    // Test 1 : créer un utilisateur valide
    const user = await User.create({
      nom: 'Alice',
      email: 'alice@example.com',
      age: 25
    });
    console.log('✅ Utilisateur créé :', user);

    // Test 2 : créer une tâche liée à cet utilisateur
    const task = await Task.create({
      titre: 'Apprendre Mongoose',
      description: 'Terminer le Jour 12',
      user: user._id
    });
    console.log('✅ Tâche créée :', task);

    // Test 3 : tester une validation (email invalide)
    try {
      await User.create({
        nom: 'Bob',
        email: 'pas-un-email',
        age: 30
      });
    } catch (err) {
      console.log('✅ Validation email OK :', err.message);
    }

    // Test 4 : tester une validation (nom trop court)
    try {
      await User.create({
        nom: 'X',
        email: 'x@example.com',
        age: 30
      });
    } catch (err) {
      console.log('✅ Validation nom OK :', err.message);
    }

  } catch (err) {
    console.error('❌ Erreur :', err.message);
  }

  process.exit(0);
})();