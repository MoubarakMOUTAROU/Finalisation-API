const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: [true, 'Le nom est obligatoire'],
    trim: true,
    minlength: [2, 'Le nom doit faire au moins 2 caractères'],
    maxlength: [50, 'Le nom ne peut pas dépasser 50 caractères']
  },
  email: {
    type: String,
    required: [true, 'L\'email est obligatoire'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Format d\'email invalide']
  },
  password: {
    type: String,
    required: [true, 'Le mot de passe est obligatoire'],
    minlength: [6, 'Le mot de passe doit faire au moins 6 caractères'],
    select: false
  },
  age: {
    type: Number,
    min: [13, 'L\'âge minimum est 13 ans'],
    max: [120, 'L\'âge maximum est 120 ans']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);