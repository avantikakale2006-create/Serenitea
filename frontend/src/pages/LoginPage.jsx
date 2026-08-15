import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Zap, User, Lock, ArrowRight } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE || '';

function LoginPage({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      params.append('username', username);
      params.append('password', password);

      const response = await axios.post(`${API_BASE}/token`, params);
      localStorage.setItem('token', response.data.access_token);
      
      const userResponse = await axios.get(`${API_BASE}/user/me`, {
        headers: { Authorization: `Bearer ${response.data.access_token}` }
      });
      
      localStorage.setItem('user', JSON.stringify(userResponse.data));
      setUser(userResponse.data);
      navigate('/');
    } catch (err) {
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '40px 20px' }}>
      <div className="glass-card fade-in" style={{ 
        padding: '60px 40px', 
        width: '100%', 
        maxWidth: '450px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative Glow */}
        <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', background: 'var(--neon-blue)', filter: 'blur(80px)', opacity: 0.2 }}></div>
        
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'inline-flex', padding: '15px', borderRadius: '15px', background: 'rgba(0, 229, 255, 0.1)', border: '1px solid rgba(0, 229, 255, 0.2)', marginBottom: '20px' }}>
            <Zap size={32} color="var(--neon-blue)" />
          </div>
          <h1 className="neon-gradient-text" style={{ 
            fontSize: '42px', 
            fontWeight: '800',
            letterSpacing: '-1px',
            marginBottom: '8px'
          }}>SereniTea</h1>
          <p style={{ color: '#A0A0A0', fontSize: '16px' }}>Sign in to your sanctuary.</p>
        </div>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '25px', textAlign: 'left' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: '600', fontSize: '14px', color: '#888', marginLeft: '5px' }}>Username</label>
            <div style={{ position: 'relative' }}>
               <User size={18} color="#555" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
               <input 
                type="text" 
                placeholder="Enter your username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ width: '100%', paddingLeft: '45px' }}
                required 
              />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: '600', fontSize: '14px', color: '#888', marginLeft: '5px' }}>Password</label>
            <div style={{ position: 'relative' }}>
               <Lock size={18} color="#555" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
               <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', paddingLeft: '45px' }}
                required 
              />
            </div>
          </div>
          
          {error && (
            <div style={{ padding: '10px', borderRadius: '8px', background: 'rgba(255, 77, 157, 0.1)', border: '1px solid var(--neon-pink)', color: 'var(--neon-pink)', fontSize: '13px', textAlign: 'center' }}>
              {error}
            </div>
          )}

          <button type="submit" className="btn btn-primary" style={{ marginTop: '10px', width: '100%', height: '50px' }} disabled={loading}>
            {loading ? 'Authenticating...' : 'Sign In'} <ArrowRight size={18} />
          </button>
        </form>
        
        <p style={{ marginTop: '40px', fontSize: '14px', color: '#888' }}>
          New to SereniTea? <Link to="/signup" style={{ 
            color: 'var(--neon-blue)', 
            fontWeight: '700',
            textDecoration: 'none',
            marginLeft: '5px'
          }}>Create an account</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
