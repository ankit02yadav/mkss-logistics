import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { FiMenu, FiX, FiUser, FiLogOut, FiGlobe } from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { t, currentLanguage, changeLanguage, availableLanguages } = useLanguage();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const getDashboardPath = () => {
    if (!user) return '/';
    switch (user.role) {
      case 'msme':
        return '/dashboard/msme';
      case 'driver':
        return '/dashboard/driver';
      case 'warehouse':
        return '/dashboard/warehouse';
      default:
        return '/';
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <div className="brand-content">
            <div className="brand-logo">MKSS</div>
            <div className="brand-text">
              <span className="brand-title">Logistics AI</span>
              <span className="brand-subtitle">Ethical Transport</span>
            </div>
          </div>
        </Link>

        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <div className="navbar-nav">
            <Link to="/" className="nav-link" onClick={closeMenu}>
              {t('home')}
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to={getDashboardPath()} className="nav-link" onClick={closeMenu}>
                  {t('dashboard')}
                </Link>
                <Link to="/route-optimization" className="nav-link" onClick={closeMenu}>
                  {t('routeOptimization')}
                </Link>
                {(user?.role === 'warehouse' || user?.role === 'msme') && (
                  <Link to="/inventory" className="nav-link" onClick={closeMenu}>
                    {t('inventoryManagement')}
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link" onClick={closeMenu}>
                  {t('login')}
                </Link>
                <Link to="/register" className="nav-link" onClick={closeMenu}>
                  {t('register')}
                </Link>
              </>
            )}
          </div>

          <div className="navbar-actions">
            {/* Language Selector */}
            <div className="language-selector">
              <button
                className="language-btn"
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
              >
                <FiGlobe />
                <span>{currentLanguage.toUpperCase()}</span>
              </button>
              {isLanguageDropdownOpen && (
                <div className="language-dropdown">
                  {availableLanguages.map((lang) => (
                    <button
                      key={lang.code}
                      className={`language-option ${currentLanguage === lang.code ? 'active' : ''}`}
                      onClick={() => {
                        changeLanguage(lang.code);
                        setIsLanguageDropdownOpen(false);
                      }}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {isAuthenticated ? (
              <div className="user-menu">
                <div className="user-info">
                  <FiUser className="user-icon" />
                  <span className="user-name">{user.name}</span>
                  <span className="user-role">{t(user.role)}</span>
                </div>
                <button className="logout-btn" onClick={handleLogout}>
                  <FiLogOut />
                  {t('logout')}
                </button>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="btn btn-outline btn-sm" onClick={closeMenu}>
                  {t('login')}
                </Link>
                <Link to="/register" className="btn btn-primary btn-sm" onClick={closeMenu}>
                  {t('register')}
                </Link>
              </div>
            )}
          </div>
        </div>

        <button className="navbar-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;