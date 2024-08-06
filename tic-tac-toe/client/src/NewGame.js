import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './NewGame.css'; // Import the CSS file

function NewGame() {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const navigate = useNavigate();

  const startGame = () => {
    axios.post('http://localhost:4000/api/games/new', { player1, player2 })
      .then(response => {
        navigate(`/game/${response.data._id}`);
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="new-game-container">
      <h1>Start New Game</h1>
      <input 
        type="text" 
        value={player1} 
        onChange={e => setPlayer1(e.target.value)} 
        placeholder="Player 1 Name" 
        className="player-input" 
      />
      <input 
        type="text" 
        value={player2} 
        onChange={e => setPlayer2(e.target.value)} 
        placeholder="Player 2 Name" 
        className="player-input" 
      />
      <button onClick={startGame} className="start-button">Start</button>
    </div>
  );
}

export default NewGame;
