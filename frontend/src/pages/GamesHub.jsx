import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, XCircle, Grid, CircleSlash, Candy, Gamepad2, Zap } from 'lucide-react';
import TicTacToe from '../games/TicTacToe.jsx';
import Ludo from '../games/Ludo.jsx';
import SnakesLadders from '../games/SnakesLadders.jsx';
import CandyMatch from '../games/CandyMatch.jsx';

function GamesHub() {
  const [activeGame, setActiveGame] = useState(null);
  const navigate = useNavigate();

  const games = [
    { id: 'ttt', name: 'Tic Tac Toe', icon: <XCircle />, description: 'Classic XOX against AI', color: 'var(--neon-blue)', bg: 'rgba(0, 229, 255, 0.1)' },
    { id: 'ludo', name: 'Mini Ludo', icon: <Grid />, description: 'Small board Ludo experience', color: 'var(--neon-purple)', bg: 'rgba(138, 43, 226, 0.1)' },
    { id: 'sl', name: 'Snakes & Ladders', icon: <CircleSlash />, description: 'Climb or slide to victory!', color: 'var(--neon-green)', bg: 'rgba(0, 255, 178, 0.1)' },
    { id: 'cc', name: 'Candy Match', icon: <Candy />, description: 'Sweet match-3 puzzle game', color: 'var(--neon-pink)', bg: 'rgba(255, 77, 157, 0.1)' }
  ];

  if (activeGame) {
    return (
      <div className="container" style={{ padding: '80px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <button onClick={() => setActiveGame(null)} className="btn btn-outline" style={{ background: 'transparent', border: 'none', marginBottom: '40px' }}>
          <ArrowLeft size={20} /> Back to Hub
        </button>
        <div className="glass-card fade-in" style={{ padding: '60px', minHeight: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ width: '100%' }}>
            {activeGame === 'ttt' && <TicTacToe />}
            {activeGame === 'ludo' && <Ludo />}
            {activeGame === 'sl' && <SnakesLadders />}
            {activeGame === 'cc' && <CandyMatch />}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '60px' }} className="fade-in">
        <button onClick={() => navigate('/')} className="btn btn-outline" style={{ background: 'transparent', border: 'none', marginBottom: '40px' }}>
          <ArrowLeft size={20} /> Back to Dashboard
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
           <div className="glass-card" style={{ width: '64px', height: '64px', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--neon-blue)', background: 'rgba(0, 229, 255, 0.1)' }}>
              <Gamepad2 size={32} color="var(--neon-blue)" />
           </div>
           <div>
              <h1 className="neon-gradient-text" style={{ fontSize: '3.5rem', marginBottom: '8px' }}>Relaxation Hub</h1>
              <p style={{ color: '#A0A0A0', fontSize: '20px' }}>Take a breath. Choose a moment of joy.</p>
           </div>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '30px' }} className="fade-in">
        {games.map((game) => (
          <div 
            key={game.id} 
            className="glass-card" 
            style={{ 
              padding: '40px', 
              cursor: 'pointer',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderBottom: `4px solid ${game.color}`
            }}
            onClick={() => setActiveGame(game.id)}
          >
            <div style={{ 
              background: game.bg, 
              width: '80px', 
              height: '80px', 
              borderRadius: '20px', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              marginBottom: '32px', 
              color: game.color,
              border: `1px solid ${game.color}44`,
              boxShadow: `0 0 20px ${game.color}22`
            }}>
              {React.cloneElement(game.icon, { size: 40 })}
            </div>
            <h3 style={{ marginBottom: '12px', fontSize: '1.4rem' }}>{game.name}</h3>
            <p style={{ color: '#888', fontSize: '15px', lineHeight: '1.6' }}>{game.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GamesHub;
