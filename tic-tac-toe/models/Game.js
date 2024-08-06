const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  player1: String,
  player2: String,
  rounds: [
    {
      winner: String,
      draw: Boolean
    }
  ],
  stats: {
    player1Wins: Number,
    player2Wins: Number,
    draws: Number
  }
});

module.exports = mongoose.model('Game', gameSchema);
