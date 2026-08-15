import React, { useState, useEffect } from 'react';

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const winner = calculateWinner(board);

  const handleClick = (i) => {
    if (winner || board[i]) return;
    const newBoard = board.slice();
    newBoard[i] = 'X';
    setBoard(newBoard);
    setIsXNext(false);
  };

  useEffect(() => {
    if (!isXNext && !winner) {
      const timer = setTimeout(() => {
        const emptySquares = board.map((sq, idx) => sq === null ? idx : null).filter(val => val !== null);
        if (emptySquares.length > 0) {
          const randomIdx = emptySquares[Math.floor(Math.random() * emptySquares.length)];
          const newBoard = board.slice();
          newBoard[randomIdx] = 'O';
          setBoard(newBoard);
          setIsXNext(true);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isXNext, board, winner]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ marginBottom: '20px' }}>Tic Tac Toe</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 100px)', gap: '10px', marginBottom: '30px' }}>
        {board.map((sq, i) => (
          <button 
            key={i} 
            onClick={() => handleClick(i)}
            className="glass-card"
            style={{ width: '100px', height: '100px', fontSize: '32px', fontWeight: 'bold', border: '1px solid var(--glass-border)', cursor: 'pointer', color: sq === 'X' ? 'var(--neon-blue)' : 'var(--neon-pink)', background: 'rgba(255,255,255,0.02)' }}
          >
            {sq}
          </button>
        ))}
      </div>
      {winner ? (
        <div className="fade-in">
          <p style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px', color: winner === 'X' ? 'var(--neon-blue)' : 'var(--neon-pink)' }}>{winner === 'Draw' ? "It's a Draw!" : `Winner: ${winner}`}</p>
          <button onClick={resetGame} className="btn btn-primary">Play Again</button>
        </div>
      ) : (
        <p style={{ color: '#888' }}>{isXNext ? "Your turn (X)" : "Computer's turn (O)"}</p>
      )}
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a];
  }
  if (squares.every(sq => sq)) return 'Draw';
  return null;
}

export default TicTacToe;
