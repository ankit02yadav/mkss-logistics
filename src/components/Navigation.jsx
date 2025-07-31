import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <span className="logo-icon">🏢</span>
          <span className="logo-text">MKSS Logistics</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-menu">
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/msme" 
            className={`nav-link ${isActive('/msme') ? 'active' : ''}`}
          >
            MSME Portal
          </Link>
          <Link 
            to="/driver" 
            className={`nav-link ${isActive('/driver') ? 'active' : ''}`}
          >
            Driver Portal
          </Link>
          <Link 
            to="/warehouse" 
            className={`nav-link ${isActive('/warehouse') ? 'active' : ''}`}
          >
            Warehouse Portal
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="nav-auth">
          <Link to="/login" className="nav-button login-btn">
            Sign In
          </Link>
          <Link to="/register" className="nav-button register-btn">
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={`mobile-menu-btn ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
        <Link 
          to="/" 
          className={`mobile-nav-link ${isActive('/') ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(false)}
        >
          Home
        </Link>
        <Link 
          to="/msme" 
          className={`mobile-nav-link ${isActive('/msme') ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(false)}
        >
          MSME Portal
        </Link>
        <Link 
          to="/driver" 
          className={`mobile-nav-link ${isActive('/driver') ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(false)}
        >
          Driver Portal
        </Link>
        <Link 
          to="/warehouse" 
          className={`mobile-nav-link ${isActive('/warehouse') ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(false)}
        >
          Warehouse Portal
        </Link>
        <div className="mobile-auth">
          <Link 
            to="/login" 
            className="mobile-auth-btn login-btn"
            onClick={() => setIsMenuOpen(false)}
          >
            Sign In
          </Link>
          <Link 
            to="/register" 
            className="mobile-auth-btn register-btn"
            onClick={() => setIsMenuOpen(false)}
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;