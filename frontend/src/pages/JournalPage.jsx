import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Send, ArrowLeft, Book, Calendar, PenLine, ScrollText, Plus, Zap, Sparkles } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE || '';

function JournalPage({ user }) {
  const [entries, setEntries] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const fetchEntries = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE}/journals`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEntries(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load journal entries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;

    try {
      setSubmitting(true);
      const token = localStorage.getItem('token');
      await axios.post(`${API_BASE}/journals`, {
        title: newTitle,
        content: newContent
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewTitle('');
      setNewContent('');
      setShowForm(false);
      fetchEntries();
    } catch (err) {
      console.error(err);
      setError("Failed to save journal entry.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
        <h3 className="neon-text">Opening your journal...</h3>
      </div>
    </div>
  );

  return (
    <div className="container" style={{ padding: '60px 20px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '60px' }} className="fade-in">
        <button onClick={() => navigate('/')} className="btn btn-outline" style={{ border: 'none', background: 'transparent' }}>
          <ArrowLeft size={20} /> Back
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
           <div className="glass-card" style={{ width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 229, 255, 0.1)', border: '1px solid var(--neon-blue)' }}>
              <Book size={28} color="var(--neon-blue)" />
           </div>
           <h1 className="neon-gradient-text" style={{ fontSize: '2.5rem' }}>Zen Journal</h1>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="btn btn-primary"
          style={{ padding: '12px 24px' }}
        >
          {showForm ? 'View All' : 'New Entry'} 
          {showForm ? <ScrollText size={18} style={{marginLeft: '8px'}} /> : <Plus size={18} style={{marginLeft: '8px'}} />}
        </button>
      </div>

      {showForm ? (
        <div className="glass-card fade-in" style={{ padding: '50px', marginBottom: '60px' }}>
          <h2 style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '16px', fontSize: '1.8rem' }}>
            <PenLine size={32} color="var(--neon-blue)" /> Write your thoughts
          </h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '30px' }}>
              <label style={{ display: 'block', marginBottom: '12px', fontWeight: '600', color: '#888', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Title</label>
              <input 
                type="text" 
                placeholder="What's on your mind today?"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                style={{ width: '100%', padding: '15px 20px', borderRadius: '12px' }}
                required
              />
            </div>
            <div style={{ marginBottom: '40px' }}>
              <label style={{ display: 'block', marginBottom: '12px', fontWeight: '600', color: '#888', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Content</label>
              <textarea 
                placeholder="Let it all out..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                required
                style={{
                  width: '100%',
                  height: '350px',
                  padding: '24px',
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--glass-border)',
                  color: 'white',
                  fontSize: '17px',
                  lineHeight: '1.6',
                  fontFamily: 'inherit',
                  resize: 'none',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.06)';
                  e.target.style.borderColor = 'var(--neon-blue)';
                  e.target.style.boxShadow = '0 0 15px rgba(0, 229, 255, 0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.03)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%', height: '60px', fontSize: '18px' }}
              disabled={submitting}
            >
              {submitting ? 'Saving...' : 'Save Entry'} <Send size={20} style={{marginLeft: '10px'}} />
            </button>
          </form>
        </div>
      ) : (
        <div className="fade-in">
          {entries.length === 0 ? (
            <div className="glass-card" style={{ padding: '60px', textAlign: 'center' }}>
              <Sparkles size={60} color="var(--neon-blue)" style={{ marginBottom: '24px', opacity: 0.5 }} />
              <h3 style={{ marginBottom: '12px', fontSize: '1.5rem' }}>Your journal is empty</h3>
              <p style={{ color: '#888', marginBottom: '32px' }}>Journaling is a powerful way to release stress and understand your patterns. Start today.</p>
              <button onClick={() => setShowForm(true)} className="btn btn-primary">Start your first entry</button>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '30px' }}>
              {entries.map(entry => (
                <div key={entry.id} className="glass-card" style={{ padding: '40px', textAlign: 'left', borderLeft: '4px solid var(--neon-blue)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '25px' }}>
                    <h3 style={{ fontSize: '1.6rem' }}>{entry.title}</h3>
                    <div className="glass-card" style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px', 
                      padding: '8px 16px', 
                      borderRadius: '50px',
                      color: 'var(--neon-blue)',
                      fontSize: '13px',
                      fontWeight: '700',
                      border: '1px solid rgba(0, 229, 255, 0.2)'
                    }}>
                      <Calendar size={14} /> {new Date(entry.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                  <div style={{ 
                    lineHeight: '1.8', 
                    color: '#D0D0D0', 
                    whiteSpace: 'pre-wrap',
                    padding: '25px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    borderRadius: '16px',
                    fontSize: '1.05rem',
                    border: '1px solid rgba(255, 255, 255, 0.05)'
                  }}>
                    {entry.content}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default JournalPage;
