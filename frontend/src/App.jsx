import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AssessmentPage from './pages/AssessmentPage.jsx';
import GamesHub from './pages/GamesHub.jsx';
import JournalPage from './pages/JournalPage.jsx';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <Router>
      <div className="app-container">
        {/* Advanced Background System */}
        <div className="wave-container">
          <div className="wave wave-1"></div>
          <div className="wave wave-2"></div>
          <div className="wave wave-3"></div>
        </div>
        <div className="bg-bubbles">
          {[...Array(30)].map((_, i) => (
            <div 
              key={i} 
              className="bubble" 
              style={{ 
                width: `${Math.random() * 6 + 2}px`, 
                height: `${Math.random() * 6 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${Math.random() * 15 + 10}s`,
                opacity: Math.random() * 0.5 + 0.2
              }}
            />
          ))}
        </div>

        <Routes>
          <Route path="/" element={user ? <Dashboard user={user} setUser={setUser} /> : <LandingPage />} />
          <Route path="/login" element={!user ? <LoginPage setUser={setUser} /> : <Navigate to="/" />} />
          <Route path="/signup" element={!user ? <SignupPage /> : <Navigate to="/" />} />
          <Route path="/assessment" element={user ? <AssessmentPage user={user} /> : <Navigate to="/login" />} />
          <Route path="/games" element={user ? <GamesHub user={user} /> : <Navigate to="/login" />} />
          <Route path="/journal" element={user ? <JournalPage user={user} /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
