import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'msme'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Mock registration - in production, this would call the API
    alert('Registration functionality will be implemented with backend integration');
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
            <h2>Create Account</h2>
            <p>Join our logistics network today</p>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="role">Account Type</label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="msme">MSME Business</option>
                  <option value="driver">Driver</option>
                  <option value="warehouse">Warehouse</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="name">Full Name / Business Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name or business name"
                  required
                />
              </div>

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
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
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
                    placeholder="Create a password"
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

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="password-input">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" required />
                  <span>I agree to the Terms of Service and Privacy Policy</span>
                </label>
              </div>

              <button type="submit" className="auth-button primary">
                Create Account
              </button>
            </form>

            <div className="auth-footer">
              <p>
                Already have an account?{' '}
                <Link to="/login" className="auth-link">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>

          <div className="auth-info-section">
            <div className="info-content">
              <h3>Why Choose MKSS Logistics?</h3>
              <div className="info-features">
                <div className="info-feature">
                  <span className="feature-icon">🚀</span>
                  <div>
                    <h4>Fast Setup</h4>
                    <p>Get started in minutes with our simple onboarding</p>
                  </div>
                </div>
                <div className="info-feature">
                  <span className="feature-icon">🔒</span>
                  <div>
                    <h4>Secure Platform</h4>
                    <p>Your data is protected with enterprise-grade security</p>
                  </div>
                </div>
                <div className="info-feature">
                  <span className="feature-icon">📞</span>
                  <div>
                    <h4>24/7 Support</h4>
                    <p>Get help whenever you need it from our support team</p>
                  </div>
                </div>
              </div>
              <div className="info-testimonial">
                <blockquote>
                  "MKSS Logistics transformed our delivery operations. We've reduced costs by 30% and improved customer satisfaction significantly."
                </blockquote>
                <cite>- Rajesh Kumar, Delhi Electronics</cite>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;