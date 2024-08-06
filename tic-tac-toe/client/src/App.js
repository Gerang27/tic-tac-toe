import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import NewGame from './NewGame';
import Game from './Game';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/new-game" element={<NewGame/>} />
          <Route path="/game/:id" element={<Game/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

