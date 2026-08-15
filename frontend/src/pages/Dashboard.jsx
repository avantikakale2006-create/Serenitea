import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { LogOut, Brain, Gamepad2, Activity, Calendar as CalendarIcon, CheckCircle, Book, Zap } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000';

function Dashboard({ user, setUser }) {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_BASE}/assessments`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAssessments(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const todayAssessment = assessments.find(a => a.date === new Date().toISOString().split('T')[0]);
  
  const pieData = todayAssessment ? [
    { name: 'Stress', value: todayAssessment.score_percentage },
    { name: 'Calm', value: 100 - todayAssessment.score_percentage }
  ] : [
    { name: 'No Data', value: 100 }
  ];

  const NEON_COLORS = ['#00E5FF', 'rgba(255, 255, 255, 0.05)'];

  return (
    <div className="container" style={{ padding: '60px 40px', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '60px' }} className="fade-in">
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div className="glass-card" style={{ width: '60px', height: '60px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(138, 43, 226, 0.2)', border: '1px solid var(--neon-purple)' }}>
            <Activity color="#8A2BE2" size={30} />
          </div>
          <div>
            <h1 className="neon-text" style={{ fontSize: '36px', marginBottom: '4px' }}>Hello, {user.username}</h1>
            <p style={{ color: '#A0A0A0', fontSize: '18px' }}>Your sanctuary is ready. How are you feeling today?</p>
          </div>
        </div>
        <button onClick={handleLogout} className="btn btn-outline" style={{ border: '1px solid rgba(255,255,255,0.1)', color: '#A0A0A0' }}>
          <LogOut size={18} /> Logout
        </button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.2fr)', gap: '40px' }} className="fade-in">
        {/* Daily Stress Card (Gauge) */}
        <div className="glass-card" style={{ padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <h3 style={{ marginBottom: '32px', fontSize: '1.5rem', alignSelf: 'flex-start' }}>Your Stress Summary</h3>
          {todayAssessment ? (
            <div style={{ width: '100%', height: '300px', position: 'relative' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="70%"
                    startAngle={180}
                    endAngle={0}
                    innerRadius={90}
                    outerRadius={120}
                    paddingAngle={0}
                    dataKey="value"
                    stroke="none"
                  >
                    <Cell fill="url(#gaugeGradient)" />
                    <Cell fill="rgba(255,255,255,0.05)" />
                  </Pie>
                  <defs>
                    <linearGradient id="gaugeGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#00E5FF" />
                      <stop offset="50%" stopColor="#8A2BE2" />
                      <stop offset="100%" stopColor="#FF4D9D" />
                    </linearGradient>
                  </defs>
                </PieChart>
              </ResponsiveContainer>
              <div style={{ position: 'absolute', top: '55%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <span style={{ fontSize: '48px', fontWeight: '800', color: '#FFF' }}>{todayAssessment.score_percentage}%</span>
                <p style={{ fontSize: '14px', color: '#A0A0A0', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600 }}>{todayAssessment.score_percentage > 70 ? 'High' : todayAssessment.score_percentage > 30 ? 'Moderate' : 'Low'}</p>
              </div>
            </div>
          ) : (
            <div style={{ padding: '40px 0', textAlign: 'center' }}>
              <div style={{ marginBottom: '24px', opacity: 0.5 }}>
                <Zap size={60} color="var(--neon-blue)" />
              </div>
              <p style={{ marginBottom: '32px', color: '#A0A0A0', fontSize: '18px' }}>Your peace hasn't been measured yet.</p>
              <button onClick={() => navigate('/assessment')} className="btn btn-primary" style={{ padding: '16px 40px' }}>
                <Brain size={20} /> Begin Check-in
              </button>
            </div>
          )}
        </div>

        {/* Suggestions & Trends Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div className="glass-card" style={{ padding: '30px' }}>
            <h3 style={{ marginBottom: '20px', fontSize: '1.2rem' }}>Stress Trends</h3>
            <div style={{ width: '100%', height: '180px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={assessments.slice(-7)}>
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00E5FF" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="#00E5FF" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#666', fontSize: 10}} />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ background: '#0B0F2A', border: '1px solid var(--neon-blue)', borderRadius: '10px' }}
                    itemStyle={{ color: '#00E5FF' }}
                  />
                  <Bar dataKey="score_percentage" fill="url(#barGradient)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '40px', flex: 1 }}>
            <h3 style={{ marginBottom: '24px', fontSize: '1.5rem' }}>Personalized Insights</h3>
            {todayAssessment ? (
              <div style={{ 
                background: 'rgba(0, 229, 255, 0.05)', 
                padding: '24px', 
                borderRadius: '20px', 
                color: '#E0E0E0',
                borderLeft: '4px solid var(--neon-blue)',
                boxShadow: '0 0 20px rgba(0, 229, 255, 0.1)'
              }}>
                <p style={{ lineHeight: '1.8', fontSize: '17px', fontWeight: '500' }}>{todayAssessment.suggestions}</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {['#DeepBreathing', '#MindfulWalk', '#ZenMusic', '#NatureSounds'].map((tag, i) => (
                  <div key={i} className="glass-card" style={{ padding: '10px 20px', borderRadius: '50px', fontSize: '13px', fontWeight: '600', color: 'var(--neon-blue)', border: '1px solid rgba(0, 229, 255, 0.2)' }}>
                    {tag}
                  </div>
                ))}
              </div>
            )}
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '40px' }}>
              <button onClick={() => navigate('/games')} className="btn btn-outline" style={{ height: '54px', borderRadius: '15px' }}>
                <Gamepad2 size={20} /> Games
              </button>
              <button onClick={() => navigate('/journal')} className="btn btn-primary" style={{ height: '54px', borderRadius: '15px' }}>
                <Book size={20} /> Journal
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '30px' }} className="fade-in">
        {/* Calendar Card */}
        <div className="glass-card" style={{ padding: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.2rem' }}>Mindfulness Calendar</h3>
            <span className="neon-text" style={{ fontSize: '14px', fontWeight: '700', color: 'var(--neon-blue)' }}>
              {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px', textAlign: 'center' }}>
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
              <div key={d} style={{ fontWeight: '700', color: '#666', fontSize: '12px', marginBottom: '5px' }}>{d}</div>
            ))}
            {(() => {
              const now = new Date();
              const year = now.getFullYear();
              const month = now.getMonth();
              const daysInMonth = new Date(year, month + 1, 0).getDate();
              const firstDayOfMonth = new Date(year, month, 1).getDay();
              
              const days = [];
              for (let j = 0; j < firstDayOfMonth; j++) {
                days.push(<div key={`empty-${j}`} style={{ height: '35px' }}></div>);
              }
              
              for (let i = 1; i <= daysInMonth; i++) {
                const dayStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
                const dayAssessment = assessments.find(a => a.date === dayStr);
                
                let bgColor = 'rgba(255, 255, 255, 0.02)';
                let borderColor = 'rgba(255, 255, 255, 0.05)';
                let glowColor = 'transparent';

                if (dayAssessment) {
                  const score = dayAssessment.score_percentage;
                  bgColor = score > 70 ? 'rgba(255, 77, 157, 0.2)' : 
                            score > 40 ? 'rgba(138, 43, 226, 0.2)' : 'rgba(0, 229, 255, 0.2)';
                  borderColor = score > 70 ? 'var(--neon-pink)' : 
                                score > 40 ? 'var(--neon-purple)' : 'var(--neon-blue)';
                  glowColor = borderColor;
                }

                days.push(
                  <div 
                    key={i} 
                    style={{ 
                      height: '35px', 
                      borderRadius: '8px', 
                      background: bgColor, 
                      border: `1px solid ${borderColor}`,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: '11px',
                      fontWeight: dayAssessment ? '800' : 'normal',
                      boxShadow: dayAssessment ? `0 0 10px ${glowColor}` : 'none',
                      transition: 'all 0.3s ease',
                      cursor: dayAssessment ? 'pointer' : 'default',
                      color: dayAssessment ? '#FFF' : '#888'
                    }}
                    title={dayAssessment ? `Stress: ${dayAssessment.score_percentage}%\nSuggestions: ${dayAssessment.suggestions || 'None'}` : ''}
                  >
                    {i}
                  </div>
                );
              }
              return days;
            })()}
          </div>
          <div style={{ marginTop: '20px', display: 'flex', gap: '15px', justifyContent: 'center' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--neon-blue)' }}></div>
                <span style={{ fontSize: '10px', color: '#666' }}>Calm</span>
             </div>
             <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--neon-purple)' }}></div>
                <span style={{ fontSize: '10px', color: '#666' }}>Moderate</span>
             </div>
             <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--neon-pink)' }}></div>
                <span style={{ fontSize: '10px', color: '#666' }}>High Stress</span>
             </div>
          </div>
        </div>

        {/* History Quick View */}
        <div className="glass-card" style={{ padding: '30px', display: 'flex', flexDirection: 'column' }}>
           <h3 style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Quick Stats</h3>
           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', flex: 1 }}>
              <div className="glass-card" style={{ padding: '20px', background: 'rgba(0, 229, 255, 0.03)', textAlign: 'center' }}>
                 <p style={{ fontSize: '12px', color: '#888', marginBottom: '10px' }}>Avg Stress</p>
                 <h4 className="neon-text" style={{ fontSize: '24px', color: 'var(--neon-blue)' }}>
                    {assessments.length > 0 
                      ? Math.round(assessments.reduce((acc, curr) => acc + curr.score_percentage, 0) / assessments.length)
                      : 0}%
                 </h4>
              </div>
              <div className="glass-card" style={{ padding: '20px', background: 'rgba(138, 43, 226, 0.03)', textAlign: 'center' }}>
                 <p style={{ fontSize: '12px', color: '#888', marginBottom: '10px' }}>Days Logged</p>
                 <h4 className="neon-text" style={{ fontSize: '24px', color: 'var(--neon-purple)' }}>{assessments.length}</h4>
              </div>
              <div className="glass-card" style={{ padding: '20px', background: 'rgba(255, 77, 157, 0.03)', textAlign: 'center', gridColumn: 'span 2' }}>
                 <p style={{ fontSize: '12px', color: '#888', marginBottom: '10px' }}>Best Day This Week</p>
                 <h4 style={{ fontSize: '18px' }}>Wednesday (24% Stress)</h4>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
