import React from 'react';
import { Link } from 'react-router-dom';
import './Portal.css';

const DriverPortal = () => {
  return (
    <div className="portal-container driver-portal">
      {/* Header */}
      <header className="portal-header">
        <div className="header-content">
          <Link to="/" className="back-link">← Back to Home</Link>
          <div className="portal-title">
            <span className="portal-icon">🚛</span>
            <h1>Driver Portal</h1>
            <p>Professional Delivery Solutions</p>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="portal-hero">
        <div className="hero-content">
          <div className="hero-text">
            <h2>Maximize Your Earnings, Minimize Your Effort</h2>
            <p>
              Join Delhi's most trusted logistics network. Access optimized routes, 
              track your earnings, and build a sustainable delivery business with fair compensation.
            </p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">200+</span>
                <span className="stat-label">Active Drivers</span>
              </div>
              <div className="stat">
                <span className="stat-number">₹45K</span>
                <span className="stat-label">Avg. Monthly Earnings</span>
              </div>
              <div className="stat">
                <span className="stat-number">4.8★</span>
                <span className="stat-label">Driver Rating</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="feature-showcase">
              <div className="showcase-item">
                <span className="showcase-icon">🗺️</span>
                <span>Smart Routes</span>
              </div>
              <div className="showcase-item">
                <span className="showcase-icon">💵</span>
                <span>Fair Earnings</span>
              </div>
              <div className="showcase-item">
                <span className="showcase-icon">⭐</span>
                <span>Performance Tracking</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="portal-features">
        <div className="section-header">
          <h2>Driver-Centric Features</h2>
          <p>Tools designed to help you succeed and earn more</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🗺️</div>
            <h3>Smart Route Optimization</h3>
            <p>Get the most efficient routes that save time, fuel, and increase your daily deliveries.</p>
            <ul className="feature-list">
              <li>✓ AI-powered route planning</li>
              <li>✓ Real-time traffic updates</li>
              <li>✓ Fuel-efficient paths</li>
              <li>✓ Multiple stop optimization</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💵</div>
            <h3>Transparent Earnings</h3>
            <p>Track your earnings in real-time with detailed breakdowns and instant payments.</p>
            <ul className="feature-list">
              <li>✓ Real-time earnings tracker</li>
              <li>✓ Daily/weekly/monthly reports</li>
              <li>✓ Instant payment processing</li>
              <li>✓ Bonus and incentive tracking</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3>Performance Analytics</h3>
            <p>Monitor your performance metrics and improve your service quality.</p>
            <ul className="feature-list">
              <li>✓ Delivery success rate</li>
              <li>✓ Customer ratings</li>
              <li>✓ On-time performance</li>
              <li>✓ Efficiency metrics</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Mobile-First Design</h3>
            <p>Access everything you need from your smartphone while on the road.</p>
            <ul className="feature-list">
              <li>✓ Offline capability</li>
              <li>✓ Voice navigation</li>
              <li>✓ One-tap updates</li>
              <li>✓ Emergency support</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>Safety & Support</h3>
            <p>24/7 support and safety features to keep you protected on the road.</p>
            <ul className="feature-list">
              <li>✓ Emergency assistance</li>
              <li>✓ Insurance coverage</li>
              <li>✓ Safety training</li>
              <li>✓ 24/7 helpline</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Flexible Scheduling</h3>
            <p>Choose your working hours and delivery preferences to maintain work-life balance.</p>
            <ul className="feature-list">
              <li>✓ Flexible work hours</li>
              <li>✓ Area preferences</li>
              <li>✓ Load type selection</li>
              <li>✓ Break scheduling</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Vehicle Types */}
      <section className="vehicle-section">
        <div className="section-header">
          <h2>Supported Vehicle Types</h2>
          <p>We support various vehicle types to match different delivery needs</p>
        </div>
        
        <div className="vehicle-grid">
          <div className="vehicle-card">
            <div className="vehicle-icon">🏍️</div>
            <h3>Two-Wheeler</h3>
            <p>Perfect for small packages and quick deliveries</p>
            <div className="vehicle-specs">
              <span>Up to 20kg</span>
              <span>₹8-12/km</span>
            </div>
          </div>
          
          <div className="vehicle-card">
            <div className="vehicle-icon">🚐</div>
            <h3>Tempo/Mini Truck</h3>
            <p>Ideal for medium-sized cargo and bulk deliveries</p>
            <div className="vehicle-specs">
              <span>Up to 1000kg</span>
              <span>₹15-25/km</span>
            </div>
          </div>
          
          <div className="vehicle-card">
            <div className="vehicle-icon">🚛</div>
            <h3>Truck</h3>
            <p>For large cargo and long-distance deliveries</p>
            <div className="vehicle-specs">
              <span>Up to 5000kg</span>
              <span>₹25-40/km</span>
            </div>
          </div>
        </div>
      </section>

      {/* Earnings Potential */}
      <section className="earnings-section">
        <div className="section-header">
          <h2>Earnings Potential</h2>
          <p>See how much you can earn based on your vehicle type and commitment</p>
        </div>
        
        <div className="earnings-grid">
          <div className="earnings-card">
            <div className="earnings-header">
              <h3>Part-Time</h3>
              <div className="hours">4-6 hours/day</div>
            </div>
            <div className="earnings-breakdown">
              <div className="earning-item">
                <span>Two-Wheeler:</span>
                <span>₹15,000-20,000/month</span>
              </div>
              <div className="earning-item">
                <span>Tempo:</span>
                <span>₹25,000-35,000/month</span>
              </div>
              <div className="earning-item">
                <span>Truck:</span>
                <span>₹35,000-45,000/month</span>
              </div>
            </div>
          </div>
          
          <div className="earnings-card featured">
            <div className="earnings-badge">Most Popular</div>
            <div className="earnings-header">
              <h3>Full-Time</h3>
              <div className="hours">8-10 hours/day</div>
            </div>
            <div className="earnings-breakdown">
              <div className="earning-item">
                <span>Two-Wheeler:</span>
                <span>₹25,000-35,000/month</span>
              </div>
              <div className="earning-item">
                <span>Tempo:</span>
                <span>₹40,000-55,000/month</span>
              </div>
              <div className="earning-item">
                <span>Truck:</span>
                <span>₹60,000-80,000/month</span>
              </div>
            </div>
          </div>
          
          <div className="earnings-card">
            <div className="earnings-header">
              <h3>Premium</h3>
              <div className="hours">10+ hours/day</div>
            </div>
            <div className="earnings-breakdown">
              <div className="earning-item">
                <span>Two-Wheeler:</span>
                <span>₹35,000-45,000/month</span>
              </div>
              <div className="earning-item">
                <span>Tempo:</span>
                <span>₹55,000-70,000/month</span>
              </div>
              <div className="earning-item">
                <span>Truck:</span>
                <span>₹80,000-1,00,000/month</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="requirements-section">
        <div className="section-header">
          <h2>Join Our Network</h2>
          <p>Simple requirements to get started</p>
        </div>
        
        <div className="requirements-grid">
          <div className="requirement-card">
            <div className="requirement-icon">📄</div>
            <h3>Documentation</h3>
            <ul>
              <li>Valid driving license</li>
              <li>Vehicle registration</li>
              <li>Insurance papers</li>
              <li>Aadhaar card</li>
            </ul>
          </div>
          
          <div className="requirement-card">
            <div className="requirement-icon">🚗</div>
            <h3>Vehicle Standards</h3>
            <ul>
              <li>Well-maintained vehicle</li>
              <li>Valid pollution certificate</li>
              <li>GPS-enabled smartphone</li>
              <li>Safety equipment</li>
            </ul>
          </div>
          
          <div className="requirement-card">
            <div className="requirement-icon">⭐</div>
            <h3>Professional Standards</h3>
            <ul>
              <li>Professional behavior</li>
              <li>Punctuality</li>
              <li>Customer service skills</li>
              <li>Basic Hindi/English</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="portal-cta">
        <div className="cta-content">
          <h2>Start Earning Today!</h2>
          <p>Join Delhi's most trusted logistics network and build a sustainable delivery business</p>
          <div className="cta-buttons">
            <Link to="/register" className="cta-button primary">Join as Driver</Link>
            <Link to="/login" className="cta-button secondary">Driver Login</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DriverPortal;