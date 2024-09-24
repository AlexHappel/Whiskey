const express = require('express');
const router = express.Router();
const Player = require('../models/Player');

// GET /api/leaderboard - Fetch leaderboard data, sorted by adjusted_score (ascending)
router.get('/leaderboard', async (req, res) => {
  try {
    // Sort players by adjusted_score in ascending order (lowest adjusted score at the top)
    const players = await Player.find().sort({ adjusted_score: 1 }); // Sort in ascending order
    res.json(players); // Send back the players array as JSON
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/leaderboard - Add or update a player in the leaderboard
router.post('/leaderboard', async (req, res) => {
  const { name, score } = req.body;

  try {
    // Find the player by name (case-insensitive)
    let player = await Player.findOne({ name: { $regex: new RegExp('^' + name + '$', 'i') } });

    if (player) {
      // Player exists, so update their actual score and increment games played
      player.actual_score += parseFloat(score); // Track their real score
      player.games_played += 1;
    } else {
      // Create a new player if not found
      player = new Player({
        name,
        actual_score: parseFloat(score),
        adjusted_score: 0, // Adjusted score starts from 0
        games_played: 1, // Start with 1 game played
      });
    }

    // Save the updated or new player
    await player.save();
    console.log(`Player ${player.name} saved with actual score: ${player.actual_score} and games played: ${player.games_played}`);

    // Calculate the average number of games played among all players for adjustment
    const allPlayers = await Player.find();
    const totalGamesPlayed = allPlayers.reduce((acc, p) => acc + p.games_played, 0);
    const averageGamesPlayed = totalGamesPlayed / allPlayers.length;

    console.log(`Average games played: ${averageGamesPlayed}`);

    // Recalculate adjusted scores for all players based on the new formula
    const savePromises = allPlayers.map(async (p) => {
      const newAdjustedScore = Math.round(calculateAdjustedScore(p.actual_score, p.games_played, averageGamesPlayed));

      // Ensure that the adjusted score only goes up
      if (newAdjustedScore > p.adjusted_score) {
        p.adjusted_score = newAdjustedScore;
      }

      console.log(`Recalculated adjusted score for player ${p.name}: ${p.adjusted_score}`);
      await p.save(); // Save each player with the updated adjusted score
      console.log(`Player ${p.name} saved with adjusted score: ${p.adjusted_score}`);
    });

    // Wait for all save operations to complete
    await Promise.all(savePromises);

    // Send the updated player info back to the client
    res.status(201).json(player);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error saving player to leaderboard' });
  }
});

// Helper function to calculate adjusted score
// Takes into account scoring mechanism where scores closer to 100 yield fewer points, and includes a catch-up mechanic for fewer games
const calculateAdjustedScore = (score, playerGames, avgGames) => {
  console.log(`Calculating adjusted score:
    Score: ${score},
    Games Played by Player: ${playerGames},
    Average Games Played: ${avgGames}`);

  if (score === 0) return Infinity; // Prevent division by zero for a player with a 0 score

  // Scoring adjustment based on proximity to 100
  const scoreAdjustment = ((101 - score) ** 2) / 101;

  // Catch-up mechanic: Adjust based on games played
  const catchUpAdjustment = 1 + ((avgGames - playerGames) / avgGames);

  // Final adjusted score
  const adjustedScore = scoreAdjustment * catchUpAdjustment;

  console.log(`Score Adjustment: ${scoreAdjustment}, Catch-up Adjustment: ${catchUpAdjustment}, Adjusted Score: ${adjustedScore}`);

  return adjustedScore;
};

module.exports = router;