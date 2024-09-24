import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [players, setPlayers] = useState([]);
  const [playerName, setPlayerName] = useState('');
  const [score, setScore] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL; // Use environment variable for API URL

  // Fetch leaderboard data on component mount
  useEffect(() => {
    if (apiUrl) {
      axios.get(`${apiUrl}/leaderboard`)
        .then(response => {
          if (Array.isArray(response.data)) {
            setPlayers(response.data);
            setError(null);
          } else {
            setError('Leaderboard data is not an array.');
          }
          setLoading(false);
        })
        .catch(error => {
          setError('Error fetching leaderboard data.');
          console.error('Error fetching leaderboard:', error);
          setLoading(false);
        });
    } else {
      setError('API URL is not defined.');
      setLoading(false);
    }
  }, [apiUrl]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (score < 0 || score > 100) {
      setError('Score must be between 0 and 100.');
      return;
    }

    // Create a new player object
    const newPlayer = {
      name: playerName,
      score: parseFloat(score),
    };

    // Add or update the player in the backend
    axios.post(`${apiUrl}/leaderboard`, newPlayer)
      .then(response => {
        setSuccessMessage('Player score submitted successfully!');
        setTimeout(() => setSuccessMessage(''), 3000); // Clear success message after 3 seconds

        // Update the leaderboard with the latest data from the backend
        axios.get(`${apiUrl}/leaderboard`)
          .then(response => {
            if (Array.isArray(response.data)) {
              setPlayers(response.data);
            } else {
              setError('Leaderboard data is not an array.');
            }
          })
          .catch(error => {
            setError('Error fetching leaderboard data.');
            console.error('Error fetching leaderboard:', error);
          });
      })
      .catch(error => {
        setError('Error saving the leaderboard.');
        console.error('Error saving the leaderboard:', error);
      });

    // Clear the form fields
    setPlayerName('');
    setScore('');
  };

  return (
    <div className="bg-darkGray min-h-screen flex justify-center items-center text-white">
      <div className="w-full max-w-4xl text-center p-6 mx-auto flex flex-col justify-center items-center font-elegant">
        <h2 className="text-4xl font-bold text-gold mb-6">Warhammer 40K Leaderboard</h2>

    {/* Success and error messages */}
    {loading && <div>Loading...</div>}
    {error && <div className="text-bloodRed">{error}</div>}
    {successMessage && <div className="text-green-500">{successMessage}</div>}

    {/* Form for score submission */}
    <form
      onSubmit={handleSubmit}
      className="bg-silver rounded-gothic p-6 mb-6 w-full max-w-md mx-auto"
    >
      <div className="mb-4">
        <label htmlFor="playerName" className="block text-white mb-2">
          Player Name
        </label>
        <input
          id="playerName"
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="w-full p-2 border border-gold rounded-gothic bg-darkGray text-white"
          placeholder="Enter your name"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="score" className="block text-white mb-2">
          Score (0-100)
        </label>
        <input
          id="score"
          type="number"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          className="w-full p-2 border border-gold rounded-gothic bg-darkGray text-white"
          placeholder="Enter your score"
          min="0"
          max="100"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-bloodRed hover:bg-deepPurple text-white font-bold py-2 px-4 rounded-gothic w-full"
      >
        Submit Score
      </button>
    </form>

    {/* Centered Leaderboard Table */}
    <div className="w-full max-w-3xl overflow-x-auto">
      <table className="w-full bg-black rounded-gothic mx-auto">
        <thead>
          <tr>
            <th className="border-b border-gold p-2 text-center">Rank</th>
            <th className="border-b border-gold p-2 text-center">Player Name</th>
            <th className="border-b border-gold p-2 text-center">Actual Score</th>
            <th className="border-b border-gold p-2 text-center">Adjusted Score</th>
            <th className="border-b border-gold p-2 text-center">Games Played</th>
          </tr>
        </thead>
        <tbody>
          {players.length > 0 ? (
            players.map((player, index) => (
              <tr key={index} className="border-t border-silver">
                <td className="p-2 text-center">{index + 1}</td>
                <td className="p-2 text-center">{player.name}</td>
                <td className="p-2 text-center">{player.actual_score}</td>
                <td className="p-2 text-center">{player.adjusted_score}</td>
                <td className="p-2 text-center">{player.games_played}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-4">No players yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
</div>
  );
};

export default Leaderboard;