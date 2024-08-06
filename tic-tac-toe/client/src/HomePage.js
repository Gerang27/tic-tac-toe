import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Import the CSS file

function HomePage() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/games')
      .then(response => setGames(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="home-container">
      <h1>Home Page</h1>
      <Link to="/new-game"><button className="start-game-button">Start New Game</button></Link>
      <h2>Previous Games</h2>
      <ul className="games-list">
        {games.map(game => (
          <li key={game._id} className="game-item">
            {game.player1} vs {game.player2} - Wins: {game.stats.player1Wins} / {game.stats.player2Wins} / Draws: {game.stats.draws}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
