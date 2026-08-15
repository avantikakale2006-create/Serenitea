import React, { useState } from 'react';
import { Dice5, User, Monitor } from 'lucide-react';

function Ludo() {
  const [pos, setPos] = useState({ player: 0, computer: 0 });
  const [dice, setDice] = useState(1);
  const [turn, setTurn] = useState('player');
  const [msg, setMsg] = useState('Roll the dice!');

  const rollDice = () => {
    if (turn !== 'player') return;
    const val = Math.floor(Math.random() * 6) + 1;
    setDice(val);
    const newPos = Math.min(pos.player + val, 20);
    setPos({ ...pos, player: newPos });
    
    if (newPos === 20) {
      setMsg('You Win! 🎉');
      return;
    }
    
    setTurn('computer');
    setMsg('Computer is rolling...');
    
    setTimeout(() => {
      const cVal = Math.floor(Math.random() * 6) + 1;
      const cPos = Math.min(pos.computer + cVal, 20);
      setPos(prev => ({ ...prev, computer: cPos }));
      if (cPos === 20) {
        setMsg('Computer Wins! 🤖');
      } else {
        setTurn('player');
        setMsg('Your turn!');
      }
    }, 1000);
  };

  const reset = () => {
    setPos({ player: 0, computer: 0 });
    setTurn('player');
    setMsg('Roll the dice!');
  };

  return (
    <div style={{ textAlign: 'center', width: '100%' }}>
      <h2 style={{ marginBottom: '20px' }}>Mini Race (Ludo Style)</h2>
      <p style={{ marginBottom: '30px', color: 'var(--text-muted)' }}>First to reach 20 wins!</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(21, 1fr)', gap: '4px', background: '#f0f0f0', padding: '10px', borderRadius: '12px', marginBottom: '40px' }}>
        {Array.from({ length: 21 }).map((_, i) => (
          <div key={i} style={{ height: '40px', background: 'white', border: '1px solid #ddd', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <span style={{ fontSize: '10px', color: '#ccc' }}>{i}</span>
            <div style={{ display: 'flex', gap: '2px' }}>
              {pos.player === i && <User size={14} color="var(--primary)" />}
              {pos.computer === i && <Monitor size={14} color="var(--error)" />}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '40px' }}>
        <div style={{ padding: '20px', borderRadius: '16px', background: 'var(--accent)' }}>
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>🎲 {dice}</div>
          <button onClick={rollDice} disabled={turn !== 'player' || pos.player === 20 || pos.computer === 20} className="btn btn-primary" style={{ width: '120px' }}>
            Roll
          </button>
        </div>
        <div style={{ textAlign: 'left' }}>
          <h3>{msg}</h3>
          <p>Player: {pos.player} / 20</p>
          <p>Computer: {pos.computer} / 20</p>
          {(pos.player === 20 || pos.computer === 20) && (
            <button onClick={reset} className="btn btn-outline" style={{ marginTop: '20px' }}>Reset</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Ludo;
