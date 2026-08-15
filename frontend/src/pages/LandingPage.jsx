import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Brain, Wind, Headphones, Heart, ChevronRight, Activity, Zap } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const LandingPage = () => {
  const navigate = useNavigate();

  const mockGaugeData = [
    { name: 'Stress', value: 64 },
    { name: 'Calm', value: 36 }
  ];
  
  const COLORS = ['#00E5FF', 'rgba(255,255,255,0.05)'];

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="glass-nav fade-in" style={{ padding: '15px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="logo-section" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="logo-icon glass-card" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '10px', background: 'rgba(0, 229, 255, 0.2)', border: '1px solid var(--neon-blue)' }}>
            <Zap size={20} color="#00E5FF" />
          </div>
          <span className="logo-text neon-text" style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '1px' }}>SereniTea</span>
        </div>
        <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <a href="#home" style={{ textDecoration: 'none', color: '#B0B0B0', fontSize: '15px', fontWeight: 500 }}>Home</a>
          <a href="#about" style={{ textDecoration: 'none', color: '#B0B0B0', fontSize: '15px', fontWeight: 500 }}>About</a>
          <a href="#tips" style={{ textDecoration: 'none', color: '#B0B0B0', fontSize: '15px', fontWeight: 500 }}>Tips</a>
          <button className="btn btn-outline" style={{ padding: '8px 24px' }} onClick={() => navigate('/login')}>
            Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section fade-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: '85vh', gap: '50px' }}>
        <div className="hero-content" style={{ maxWidth: '600px' }}>
          <h1 className="hero-title neon-gradient-text" style={{ fontSize: '72px', lineHeight: 1.1, marginBottom: '24px' }}>
            Find Your <br /> Stress Level
          </h1>
          <p className="hero-subtitle" style={{ fontSize: '18px', color: '#A0A0A0', marginBottom: '40px', lineHeight: 1.6 }}>
            Take the test to measure your stress levels and get personalized advice tailored just for you.
          </p>
          <button className="btn btn-primary" style={{ padding: '16px 48px', fontSize: '18px' }} onClick={() => navigate('/signup')}>
            Take the Test
          </button>
        </div>

        <div className="hero-visual glass-card" style={{ flex: 1, padding: '40px', maxWidth: '450px', position: 'relative' }}>
          <div style={{ textAlign: 'left', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 600 }}>Your Stress Summary</h3>
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', marginTop: '10px' }}></div>
          </div>
          
          <div style={{ height: '240px', position: 'relative' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockGaugeData}
                  cx="50%"
                  cy="70%"
                  startAngle={180}
                  endAngle={0}
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={0}
                  dataKey="value"
                  stroke="none"
                >
                  <Cell fill="url(#neonGradient)" />
                  <Cell fill="rgba(255,255,255,0.05)" />
                </Pie>
                <defs>
                   <linearGradient id="neonGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#00E5FF" />
                    <stop offset="50%" stopColor="#8A2BE2" />
                    <stop offset="100%" stopColor="#FF4D9D" />
                  </linearGradient>
                </defs>
              </PieChart>
            </ResponsiveContainer>
            <div style={{ position: 'absolute', top: '55%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
              <span style={{ fontSize: '42px', fontWeight: '800', color: '#FFF' }}>64%</span>
              <p style={{ fontSize: '14px', color: '#A0A0A0', fontWeight: 600 }}>Moderate</p>
            </div>
          </div>

          <div className="glass-card" style={{ marginTop: '20px', padding: '20px', background: 'rgba(0,0,0,0.2)' }}>
             <h4 style={{ fontSize: '14px', marginBottom: '15px', color: '#DDD' }}>Stress Trends</h4>
             <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '60px' }}>
                {[30, 45, 35, 60, 50, 75, 64].map((v, i) => (
                  <div key={i} style={{ 
                    flex: 1, 
                    height: `${v}%`, 
                    background: i === 6 ? 'var(--neon-blue)' : 'rgba(0, 229, 255, 0.3)',
                    borderRadius: '4px 4px 0 0',
                    boxShadow: i === 6 ? '0 0 10px var(--neon-blue)' : 'none'
                  }}></div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section id="tips" className="features-section fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', maxWidth: '1100px', margin: '0 auto' }}>
        <div className="glass-card feature-card" style={{ padding: '40px', display: 'flex', gap: '24px', alignItems: 'center', borderLeft: '4px solid var(--neon-blue)', boxShadow: 'var(--blue-glow)' }}>
          <div className="icon-box" style={{ width: '60px', height: '60px', borderRadius: '15px', background: 'rgba(0, 229, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Activity color="#00E5FF" size={32} />
          </div>
          <div>
            <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>Quick Check-Ins</h3>
            <p style={{ color: '#A0A0A0', fontSize: '15px' }}>Monitor your stress levels quickly and easily.</p>
          </div>
        </div>

        <div className="glass-card feature-card" style={{ padding: '40px', display: 'flex', gap: '24px', alignItems: 'center', borderLeft: '4px solid var(--neon-pink)', boxShadow: 'var(--purple-glow)' }}>
          <div className="icon-box" style={{ width: '60px', height: '60px', borderRadius: '15px', background: 'rgba(255, 77, 157, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles color="#FF4D9D" size={32} />
          </div>
          <div>
            <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>Stress Relief Tips</h3>
            <p style={{ color: '#A0A0A0', fontSize: '15px' }}>Discover techniques to manage and reduce stress.</p>
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="cta-section fade-in" style={{ textAlign: 'center', padding: '120px 0' }}>
        <h2 style={{ fontSize: '36px', marginBottom: '16px' }}>Ready to check your stress level?</h2>
        <p style={{ color: '#A0A0A0', marginBottom: '40px' }}>Get your personalized recommendations today.</p>
        <button className="btn btn-primary" style={{ padding: '16px 48px' }} onClick={() => navigate('/signup')}>
          Get Started
        </button>
      </section>

      {/* Footer */}
      <footer style={{ padding: '60px', textAlign: 'center', color: '#666', fontSize: '14px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <p>&copy; 2026 Serenity. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
