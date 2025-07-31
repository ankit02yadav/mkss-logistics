import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock login - in production, this would call the API
    alert('Login functionality will be implemented with backend integration');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <Link to="/" className="back-link">← Back to Home</Link>
          <div className="auth-logo">
            <span className="logo-icon">🏢</span>
            <h1>MKSS Logistics</h1>
          </div>
        </div>

        <div className="auth-content">
          <div className="auth-form-section">
            <h2>Welcome Back</h2>
            <p>Sign in to your account to continue</p>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-input">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <Link to="/forgot-password" className="forgot-link">
                  Forgot Password?
                </Link>
              </div>

              <button type="submit" className="auth-button primary">
                Sign In
              </button>
            </form>

            <div className="auth-divider">
              <span>or</span>
            </div>

            <div className="role-login-buttons">
              <button className="role-button msme">
                <span className="role-icon">🏭</span>
                <span>Login as MSME</span>
              </button>
              <button className="role-button driver">
                <span className="role-icon">🚛</span>
                <span>Login as Driver</span>
              </button>
              <button className="role-button warehouse">
                <span className="role-icon">🏪</span>
                <span>Login as Warehouse</span>
              </button>
            </div>

            <div className="auth-footer">
              <p>
                Don't have an account?{' '}
                <Link to="/register" className="auth-link">
                  Sign up here
                </Link>
              </p>
            </div>
          </div>

          <div className="auth-info-section">
            <div className="info-content">
              <h3>Join Delhi's Leading Logistics Network</h3>
              <div className="info-features">
                <div className="info-feature">
                  <span className="feature-icon">📍</span>
                  <div>
                    <h4>Real-time Tracking</h4>
                    <p>Monitor your deliveries with GPS precision</p>
                  </div>
                </div>
                <div className="info-feature">
                  <span className="feature-icon">💰</span>
                  <div>
                    <h4>Cost Optimization</h4>
                    <p>Reduce logistics costs by up to 30%</p>
                  </div>
                </div>
                <div className="info-feature">
                  <span className="feature-icon">🤝</span>
                  <div>
                    <h4>Ethical Practices</h4>
                    <p>Fair wages and transparent pricing</p>
                  </div>
                </div>
              </div>
              <div className="info-stats">
                <div className="stat">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Active MSMEs</span>
                </div>
                <div className="stat">
                  <span className="stat-number">200+</span>
                  <span className="stat-label">Verified Drivers</span>
                </div>
                <div className="stat">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Partner Warehouses</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;