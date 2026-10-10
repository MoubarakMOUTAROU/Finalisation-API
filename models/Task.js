const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: [true, 'Le titre est obligatoire'],
    trim: true,
    maxlength: [100, 'Le titre ne peut pas dépasser 100 caractères']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'La description ne peut pas dépasser 500 caractères']
  },
  statut: {
    type: String,
    enum: {
      values: ['à faire', 'en cours', 'terminée'],
      message: 'Le statut doit être : à faire, en cours ou terminée'
    },
    default: 'à faire'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Chaque tâche doit être associée à un utilisateur']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Task', taskSchema);