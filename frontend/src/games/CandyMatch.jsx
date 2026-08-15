import React, { useState, useEffect } from 'react';

const CANDIES = ['🍎', '🍇', '🍊', '🍓', '🥑'];

function CandyMatch() {
  const [board, setBoard] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const initialBoard = Array.from({ length: 25 }, () => CANDIES[Math.floor(Math.random() * CANDIES.length)]);
    setBoard(initialBoard);
  }, []);

  const swap = (idx) => {
    const newBoard = [...board];
    newBoard[idx] = CANDIES[Math.floor(Math.random() * CANDIES.length)];
    setBoard(newBoard);
    setScore(score + 10);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Candy Match</h2>
      <p style={{ marginBottom: '20px' }}>Score: {score}</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 60px)', gap: '10px', marginBottom: '30px' }}>
        {board.map((candy, i) => (
          <button 
            key={i} 
            onClick={() => swap(i)}
            className="glass-card"
            style={{ width: '60px', height: '60px', fontSize: '24px', cursor: 'pointer', border: 'none' }}
          >
            {candy}
          </button>
        ))}
      </div>
      <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Simplified version: Click to "match" and gain points!</p>
    </div>
  );
}

export default CandyMatch;
