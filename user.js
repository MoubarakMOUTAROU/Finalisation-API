const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nom: String,
  age: Number,
  ville: String
});

module.exports = mongoose.model('User', userSchema);