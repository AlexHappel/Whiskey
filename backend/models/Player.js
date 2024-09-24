const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  actual_score: {
    type: Number,
    required: true,
    default: 0,
  },
  adjusted_score: {
    type: Number,
    required: true,
    default: 0,
  },
  games_played: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model('Player', PlayerSchema);