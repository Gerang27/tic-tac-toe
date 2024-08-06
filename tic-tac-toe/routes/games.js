const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

// Get all games
router.get('/', async (req, res) => {
  const games = await Game.find();
  res.json(games);
});

// Start a new game
router.post('/new', async (req, res) => {
  const { player1, player2 } = req.body;
  const newGame = new Game({ player1, player2, rounds: [], stats: { player1Wins: 0, player2Wins: 0, draws: 0 } });
  await newGame.save();
  res.json(newGame);
});

// Update game results
router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { winner, draw } = req.body;
  
    console.log('Updating game:', { id, winner, draw });
  
    try {
      const game = await Game.findById(id);
      if (game) {
        game.rounds.push({ winner, draw });
        if (winner === 'Player 1') game.stats.player1Wins++;
        if (winner === 'Player 2') game.stats.player2Wins++;
        if (draw) game.stats.draws++;
        await game.save();
        res.json(game);
      } else {
        res.status(404).send('Game not found');
      }
    } catch (error) {
      console.error('Error updating game:', error);
      res.status(500).send('Server error');
    }
  });  

module.exports = router;
