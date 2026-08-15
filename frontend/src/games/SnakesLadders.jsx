import React, { useState } from 'react';

function SnakesLadders() {
  const [playerPos, setPlayerPos] = useState(1);
  const [dice, setDice] = useState(1);
  const [msg, setMsg] = useState('Welcome! Roll to start.');

  const snakes = { 17: 7, 25: 15, 30: 10 };
  const ladders = { 3: 13, 11: 21, 15: 26 };

  const roll = () => {
    const val = Math.floor(Math.random() * 6) + 1;
    setDice(val);
    let newPos = playerPos + val;
    let currentMsg = `You rolled a ${val}.`;

    if (newPos > 30) {
      newPos = playerPos;
      currentMsg += " Too high! Stay put.";
    } else if (ladders[newPos]) {
      currentMsg += ` Climbing a ladder to ${ladders[newPos]}!`;
      newPos = ladders[newPos];
    } else if (snakes[newPos]) {
      currentMsg += ` Oh no! A snake bit you. Sliding to ${snakes[newPos]}.`;
      newPos = snakes[newPos];
    }

    setPlayerPos(newPos);
    setMsg(currentMsg);

    if (newPos === 30) {
      setMsg("You reached the top! 🎉 Victory!");
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Snakes & Ladders</h2>
      <p style={{ marginBottom: '20px', color: 'var(--text-muted)' }}>{msg}</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 60px)', gap: '4px', background: '#e2e8f0', padding: '10px', borderRadius: '12px', marginBottom: '30px', transform: 'scaleX(1)' }}>
        {Array.from({ length: 30 }).map((_, i) => {
          const num = 30 - i;
          return (
            <div key={num} style={{ 
              width: '60px', height: '60px', background: 'white', border: '1px solid #ddd', 
              display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative',
              color: snakes[num] ? 'red' : ladders[num] ? 'green' : 'black'
            }}>
              {num}
              {playerPos === num && <div style={{ position: 'absolute', width: '20px', height: '20px', background: 'var(--primary)', borderRadius: '50%', border: '2px solid white' }}></div>}
            </div>
          );
        })}
      </div>

      <div style={{ fontSize: '40px', marginBottom: '10px' }}>🎲 {dice}</div>
      <button onClick={roll} disabled={playerPos === 30} className="btn btn-primary">Roll Dice</button>
      {playerPos === 30 && <button onClick={() => {setPlayerPos(1); setMsg('Welcome! Roll to start.');}} className="btn btn-outline" style={{ marginLeft: '10px' }}>Reset</button>}
    </div>
  );
}

export default SnakesLadders;
