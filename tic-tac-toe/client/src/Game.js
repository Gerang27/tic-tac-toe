import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Game.css'; // Import the CSS file

function Game() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('Player 1');
  const [winner, setWinner] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false); // State to control prompt visibility
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:4000/api/games/${id}`)
      .then(response => {
        setGame(response.data);
        setBoard(Array(9).fill(null)); // Reset board
        setWinner(null); // Reset winner
        setShowPrompt(false); // Ensure prompt is hidden on initial load
      })
      .catch(error => console.error(error));
  }, [id]);

  const handleClick = (index) => {
    if (board[index] || winner) return; // Prevent clicking if the game is won

    const newBoard = board.slice();
    newBoard[index] = currentPlayer === 'Player 1' ? 'X' : 'O';
    setBoard(newBoard);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(currentPlayer);
      setShowPrompt(true); // Show prompt when the game is over
      axios.put(`http://localhost:4000/api/games/update/${id}`, { winner: currentPlayer, draw: false })
        .then(() => alert(`${currentPlayer} wins!`))
        .catch(error => console.error(error));
    } else if (newBoard.every(square => square)) { // Check for a draw
      setWinner('Draw');
      setShowPrompt(true); // Show prompt when the game is a draw
      axios.put(`http://localhost:4000/api/games/update/${id}`, { winner: 'Draw', draw: true })
        .then(() => alert('The game is a draw!'))
        .catch(error => console.error(error));
    } else {
      setCurrentPlayer(currentPlayer === 'Player 1' ? 'Player 2' : 'Player 1');
    }
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleContinue = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setCurrentPlayer('Player 1'); // Reset to the initial player or as per game rules
    setShowPrompt(false); // Hide prompt
  };

  const handleStop = () => {
    navigate('/'); // Redirect to the home page or other desired route
  };

  return (
    <div className="game-container">
      <h1>Game</h1>
      <div className="board">
        {board.map((value, index) => (
          <button key={index} onClick={() => handleClick(index)} className="board-square">
            {value}
          </button>
        ))}
      </div>
      {showPrompt && (
        <div className="prompt">
          <h2>{winner === 'Draw' ? 'The game is a draw!' : `${winner} wins!`}</h2>
          <button onClick={handleContinue} className="prompt-button">Continue to Play</button>
          <button onClick={handleStop} className="prompt-button">Stop</button>
        </div>
      )}
      {!showPrompt && !winner && (
        <button onClick={handleStop} className="stop-button">Stop</button>
      )}
    </div>
  );
}

export default Game;
