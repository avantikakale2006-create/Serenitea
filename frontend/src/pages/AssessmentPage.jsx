import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Send, CheckCircle2, ArrowRight, ArrowLeft, Brain, Sparkles, Activity, Gamepad2, Zap } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000';

function AssessmentPage({ user }) {
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setError(null);
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_BASE}/questions`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const assessmentsRes = await axios.get(`${API_BASE}/assessments`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const todayStr = new Date().toISOString().split('T')[0];
        const alreadySubmitted = assessmentsRes.data.some(a => a.date === todayStr);

        if (alreadySubmitted) {
          setError("You've already completed your zen check-in for today!");
        } else if (response.data.length === 0) {
          setError("No questions found. Please try again later.");
        } else {
          setQuestions(response.data); 
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load questions. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const handleSelect = (val) => {
    setAnswers({ ...answers, [questions[currentIdx].id]: val });
  };

  const handleSubmit = async () => {
    const scoreQuestions = questions.filter(q => q.category !== 'Incident');
    const totalScore = scoreQuestions.reduce((acc, q) => acc + (answers[q.id] || 0), 0);
    const percentage = (totalScore / (scoreQuestions.length * 4)) * 100;
    
    let level = "Low";
    let accentColor = 'var(--neon-blue)';
    if (percentage > 75) { level = "Severe"; accentColor = 'var(--neon-pink)'; }
    else if (percentage > 50) { level = "High"; accentColor = 'var(--neon-purple)'; }
    else if (percentage > 25) { level = "Moderate"; accentColor = 'var(--neon-blue)'; }

    let suggestions = "You're doing great! Keep up your healthy routines and stay mindful.";
    if (level === "Severe") {
      suggestions = "Your stress levels are very high. Please consider taking a break immediately. We recommend a 20-minute guided meditation and talking to a trusted friend or professional.";
    } else if (level === "High") {
      suggestions = "You're feeling significant pressure. Try to disconnect from work/screens for at least 2 hours and try some gentle yoga or a long walk.";
    } else if (level === "Moderate") {
      suggestions = "You're feeling some day-to-day stress. Practice deep breathing for 5-10 minutes and listen to some calming music.";
    }

    const incidentQuestion = questions.find(q => q.category === 'Incident');
    const incidentText = incidentQuestion ? answers[incidentQuestion.id] : "";

    try {
      setSubmitting(true);
      setError(null);
      const token = localStorage.getItem('token');
      await axios.post(`${API_BASE}/assessments`, {
        score_percentage: parseFloat(percentage.toFixed(1)),
        suggestions: suggestions,
        incident: incidentText || ""
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setResult({ percentage, level, suggestions, accentColor });
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
      setError("Failed to submit assessment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
        <h3 className="neon-text">Loading peace...</h3>
      </div>
    </div>
  );

  if (error && questions.length === 0) {
    const isAlreadySubmitted = error.includes("already");
    return (
      <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <div className="glass-card fade-in" style={{ padding: '60px', textAlign: 'center', maxWidth: '500px' }}>
          <h3 style={{ color: isAlreadySubmitted ? 'var(--neon-blue)' : 'var(--neon-pink)', marginBottom: '30px', lineHeight: 1.4 }}>{error}</h3>
          {isAlreadySubmitted ? (
            <button onClick={() => navigate('/')} className="btn btn-primary"><Brain size={18} /> Back to Dashboard</button>
          ) : (
            <button onClick={() => window.location.reload()} className="btn btn-primary">Try Again</button>
          )}
        </div>
      </div>
    );
  }

  if (submitted) {
    const pieData = [
      { name: 'Stress', value: result.percentage },
      { name: 'Calm', value: 100 - result.percentage }
    ];

    return (
      <div className="container" style={{ padding: '80px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <div className="glass-card fade-in" style={{ padding: '60px', textAlign: 'center' }}>
          <div style={{ 
            display: 'inline-flex', 
            padding: '24px', 
            borderRadius: '50%', 
            background: 'rgba(0, 229, 255, 0.1)', 
            color: 'var(--neon-blue)',
            marginBottom: '40px',
            boxShadow: '0 0 30px rgba(0, 229, 255, 0.2)'
          }}>
            <CheckCircle2 size={56} />
          </div>
          
          <h2 className="neon-gradient-text" style={{ fontSize: '3rem', marginBottom: '12px' }}>Your Zen Report</h2>
          <p style={{ color: '#A0A0A0', fontSize: '1.2rem', marginBottom: '60px' }}>Quiet the mind, and the soul will speak.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '40px', textAlign: 'left', marginBottom: '60px' }}>
            <div className="glass-card" style={{ padding: '48px', borderLeft: `6px solid ${result.accentColor}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                <Sparkles size={28} color={result.accentColor} />
                <h3 style={{ fontSize: '1.8rem' }}>Daily Insight</h3>
              </div>
              <p style={{ 
                fontSize: '1.2rem', 
                lineHeight: '1.8', 
                color: '#E0E0E0',
                fontStyle: 'italic'
              }}>
                "{result.suggestions}"
              </p>
            </div>

            <div className="glass-card" style={{ padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '100%', height: '220px', position: 'relative' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={75}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      <Cell fill={result.accentColor} />
                      <Cell fill="rgba(255,255,255,0.05)" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                  <span style={{ fontSize: '36px', fontWeight: '900', color: '#FFF' }}>{result.percentage.toFixed(0)}%</span>
                  <p style={{ fontSize: '12px', textTransform: 'uppercase', color: '#888' }}>Stress</p>
                </div>
              </div>
              <div style={{ textAlign: 'center', marginTop: '32px' }}>
                <h4 className="neon-text" style={{ fontSize: '2rem', color: result.accentColor }}>{result.level}</h4>
                <p style={{ color: '#888', fontSize: '14px' }}>Current State</p>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <button onClick={() => navigate('/games')} className="btn btn-outline" style={{ height: '64px', fontSize: '18px' }}>
              <Gamepad2 size={24} /> Relaxation Games
            </button>
            <button onClick={() => navigate('/')} className="btn btn-primary" style={{ height: '64px', fontSize: '18px' }}>
              <Brain size={24} /> Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIdx];

  return (
    <div className="container" style={{ padding: '60px 20px', maxWidth: '850px', margin: '0 auto' }}>
      <button onClick={() => navigate('/')} className="btn btn-outline" style={{ marginBottom: '40px', border: 'none', background: 'transparent' }}>
        <ArrowLeft size={20} /> Back to Dashboard
      </button>

      <div className="glass-card fade-in" style={{ padding: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
          <span style={{ fontWeight: '700', color: 'var(--neon-blue)', fontSize: '16px' }}>Step {currentIdx + 1} of {questions.length}</span>
          <div style={{ width: '250px', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ 
              width: `${((currentIdx + 1) / questions.length) * 100}%`, 
              height: '100%', 
              background: 'linear-gradient(90deg, var(--neon-blue), var(--neon-purple))', 
              transition: 'width 0.6s ease',
              borderRadius: '10px',
              boxShadow: '0 0 10px var(--neon-blue)'
            }}></div>
          </div>
        </div>

        <h2 style={{ marginBottom: '48px', fontSize: '2.2rem', lineHeight: '1.4' }}>{currentQuestion.text}</h2>

        <div style={{ display: 'grid', gap: '20px' }}>
          {currentQuestion.category === 'Incident' ? (
            <textarea
              placeholder="Deep breaths. Write whatever is on your mind..."
              value={answers[currentQuestion.id] || ''}
              onChange={(e) => handleSelect(e.target.value)}
              style={{
                width: '100%',
                height: '240px',
                padding: '24px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid var(--glass-border)'
              }}
            />
          ) : (
            (currentQuestion.options || ['Never', 'Almost Never', 'Sometimes', 'Fairly Often', 'Very Often']).map((label, idx) => (
              <button 
                key={label}
                className={`btn ${answers[currentQuestion.id] === idx ? 'btn-primary' : 'btn-outline'}`}
                style={{ 
                  justifyContent: 'flex-start', 
                  padding: '20px 32px',
                  fontSize: '17px',
                  background: answers[currentQuestion.id] === idx ? 'linear-gradient(90deg, var(--neon-blue), var(--neon-purple))' : 'rgba(255,255,255,0.02)',
                  borderColor: answers[currentQuestion.id] === idx ? 'transparent' : 'rgba(255,255,255,0.1)',
                  boxShadow: answers[currentQuestion.id] === idx ? '0 0 20px rgba(0, 229, 255, 0.3)' : 'none'
                }}
                onClick={() => handleSelect(idx)}
              >
                <div style={{ 
                  width: '24px', 
                  height: '24px', 
                  borderRadius: '50%', 
                  border: '2px solid rgba(255,255,255,0.2)',
                  marginRight: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: answers[currentQuestion.id] === idx ? 'white' : 'transparent'
                }}>
                  {answers[currentQuestion.id] === idx && <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--neon-blue)' }}></div>}
                </div>
                {label}
              </button>
            ))
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '60px' }}>
          <button 
            disabled={currentIdx === 0}
            className="btn btn-outline"
            style={{ padding: '12px 30px', border: 'none', background: 'transparent' }}
            onClick={() => setCurrentIdx(currentIdx - 1)}
          >
            <ArrowLeft size={20} /> Previous
          </button>
          {currentIdx === questions.length - 1 ? (
            <button 
              disabled={answers[currentQuestion.id] === undefined || submitting}
              className="btn btn-primary"
              onClick={handleSubmit}
              style={{ padding: '14px 48px' }}
            >
              {submitting ? 'Finding your zen...' : 'Finish Check-in'} <Send size={20} />
            </button>
          ) : (
            <button 
              disabled={answers[currentQuestion.id] === undefined}
              className="btn btn-primary"
              onClick={() => setCurrentIdx(currentIdx + 1)}
              style={{ padding: '14px 48px' }}
            >
              Next Step <ArrowRight size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AssessmentPage;
