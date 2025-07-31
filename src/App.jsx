import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import MSMEPortal from './pages/MSMEPortal';
import DriverPortal from './pages/DriverPortal';
import WarehousePortal from './pages/WarehousePortal';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/msme" element={<MSMEPortal />} />
            <Route path="/driver" element={<DriverPortal />} />
            <Route path="/warehouse" element={<WarehousePortal />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={
              <div style={{ 
                minHeight: '100vh', 
                background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                textAlign: 'center',
                padding: '2rem'
              }}>
                <div>
                  <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>🚧 Page Not Found</h2>
                  <p style={{ marginBottom: '2rem', opacity: 0.8 }}>The page you're looking for doesn't exist.</p>
                  <a 
                    href="/" 
                    style={{ 
                      color: '#3b82f6', 
                      textDecoration: 'none',
                      padding: '0.75rem 1.5rem',
                      border: '2px solid #3b82f6',
                      borderRadius: '8px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.background = '#3b82f6';
                      e.target.style.color = 'white';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.background = 'transparent';
                      e.target.style.color = '#3b82f6';
                    }}
                  >
                    ← Back to Home
                  </a>
                </div>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
