import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Zap, User, Lock, Briefcase, UserPlus } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE || '';

function SignupPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    occupation: 'student'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await axios.post(`${API_BASE}/signup`, {
        username: formData.username,
        password: formData.password,
        occupation: formData.occupation
      });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.detail || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '40px 20px' }}>
      <div className="glass-card fade-in" style={{ 
        padding: '60px 40px', 
        width: '100%', 
        maxWidth: '500px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative Glow */}
        <div style={{ position: 'absolute', bottom: '-50px', left: '-50px', width: '150px', height: '150px', background: 'var(--neon-purple)', filter: 'blur(80px)', opacity: 0.15 }}></div>
        
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'inline-flex', padding: '15px', borderRadius: '15px', background: 'rgba(138, 43, 226, 0.1)', border: '1px solid rgba(138, 43, 226, 0.2)', marginBottom: '20px' }}>
            <Zap size={32} color="var(--neon-purple)" />
          </div>
          <h1 className="neon-gradient-text" style={{ 
            fontSize: '42px', 
            fontWeight: '800',
            letterSpacing: '-1px',
            marginBottom: '8px'
          }}>Join SereniTea</h1>
          <p style={{ color: '#A0A0A0', fontSize: '16px' }}>Begin your journey to peace.</p>
        </div>
        
        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: '600', fontSize: '13px', color: '#888', marginLeft: '5px' }}>Username</label>
            <div style={{ position: 'relative' }}>
              <User size={18} color="#555" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="text" 
                placeholder="Choose a username" 
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                style={{ width: '100%', paddingLeft: '45px' }}
                required 
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: '600', fontSize: '13px', color: '#888', marginLeft: '5px' }}>Occupation</label>
            <div style={{ position: 'relative' }}>
              <Briefcase size={18} color="#555" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
              <select 
                value={formData.occupation}
                onChange={(e) => setFormData({...formData, occupation: e.target.value})}
                style={{ width: '100%', paddingLeft: '45px', appearance: 'none' }}
              >
                <option value="student">Student</option>
                <option value="employee">Employee</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: '600', fontSize: '13px', color: '#888', marginLeft: '5px' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="#555" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="password" 
                placeholder="Create a password" 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                style={{ width: '100%', paddingLeft: '45px' }}
                required 
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: '600', fontSize: '13px', color: '#888', marginLeft: '5px' }}>Confirm Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="#555" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="password" 
                placeholder="Repeat your password" 
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
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

          <button type="submit" className="btn btn-primary" style={{ marginTop: '10px', width: '100%', height: '52px' }} disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'} <UserPlus size={18} />
          </button>
        </form>
        
        <p style={{ marginTop: '40px', fontSize: '14px', color: '#888' }}>
          Already have an account? <Link to="/login" style={{ 
            color: 'var(--neon-purple)', 
            fontWeight: '700',
            textDecoration: 'none',
            marginLeft: '5px'
          }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
