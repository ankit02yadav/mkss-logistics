import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              MKSS Foundation
              <span className="hero-subtitle">Ethical Logistics Platform</span>
            </h1>
            <p className="hero-description">
              Connecting Delhi's industrial ecosystem through sustainable, efficient, and ethical logistics solutions for MSMEs, Drivers, and Warehouses.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">Active MSMEs</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">200+</span>
                <span className="stat-label">Verified Drivers</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Partner Warehouses</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-card">
              <div className="card-icon">🚛</div>
              <div className="card-text">Real-time Tracking</div>
            </div>
            <div className="floating-card delay-1">
              <div className="card-icon">📊</div>
              <div className="card-text">AI Optimization</div>
            </div>
            <div className="floating-card delay-2">
              <div className="card-icon">🌱</div>
              <div className="card-text">Eco-Friendly</div>
            </div>
          </div>
        </div>
      </section>

      {/* User Portals Section */}
      <section className="portals-section">
        <div className="section-header">
          <h2 className="section-title">Choose Your Portal</h2>
          <p className="section-description">
            Access specialized tools and features designed for your role in the logistics ecosystem
          </p>
        </div>
        
        <div className="portals-grid">
          {/* MSME Portal */}
          <Link to="/msme" className="portal-card msme-portal">
            <div className="portal-icon">
              <span className="icon-emoji">🏭</span>
            </div>
            <div className="portal-content">
              <h3 className="portal-title">MSME Portal</h3>
              <p className="portal-description">
                Create delivery requests, track shipments, and access shared logistics resources to grow your business efficiently.
              </p>
              <ul className="portal-features">
                <li>📦 Delivery Management</li>
                <li>📍 Real-time Tracking</li>
                <li>💰 Cost Optimization</li>
                <li>📊 Analytics Dashboard</li>
              </ul>
              <div className="portal-button">
                <span>Access MSME Portal</span>
                <span className="arrow">→</span>
              </div>
            </div>
          </Link>

          {/* Driver Portal */}
          <Link to="/driver" className="portal-card driver-portal">
            <div className="portal-icon">
              <span className="icon-emoji">🚛</span>
            </div>
            <div className="portal-content">
              <h3 className="portal-title">Driver Portal</h3>
              <p className="portal-description">
                Manage deliveries, optimize routes, track earnings, and access tools designed to maximize your efficiency and income.
              </p>
              <ul className="portal-features">
                <li>🗺️ Route Optimization</li>
                <li>💵 Earnings Tracker</li>
                <li>⭐ Performance Metrics</li>
                <li>📱 Mobile-First Design</li>
              </ul>
              <div className="portal-button">
                <span>Access Driver Portal</span>
                <span className="arrow">→</span>
              </div>
            </div>
          </Link>

          {/* Warehouse Portal */}
          <Link to="/warehouse" className="portal-card warehouse-portal">
            <div className="portal-icon">
              <span className="icon-emoji">🏪</span>
            </div>
            <div className="portal-content">
              <h3 className="portal-title">Warehouse Portal</h3>
              <p className="portal-description">
                Manage inventory, schedule deliveries, monitor capacity, and access comprehensive analytics for optimal operations.
              </p>
              <ul className="portal-features">
                <li>📋 Inventory Management</li>
                <li>🕒 Scheduling System</li>
                <li>📈 Capacity Analytics</li>
                <li>🔔 Smart Alerts</li>
              </ul>
              <div className="portal-button">
                <span>Access Warehouse Portal</span>
                <span className="arrow">→</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Industrial Hubs Section */}
      <section className="hubs-section">
        <div className="section-header">
          <h2 className="section-title">Serving Delhi's Industrial Hubs</h2>
          <p className="section-description">
            Comprehensive logistics coverage across major industrial areas
          </p>
        </div>
        
        <div className="hubs-grid">
          <div className="hub-card">
            <div className="hub-icon">🏭</div>
            <h3>Okhla Industrial Area</h3>
            <p>Electronics & Manufacturing Hub</p>
            <div className="hub-stats">
              <span>150+ MSMEs</span>
              <span>Active Coverage</span>
            </div>
          </div>
          
          <div className="hub-card">
            <div className="hub-icon">🧵</div>
            <h3>Bawana Industrial Area</h3>
            <p>Textiles & Automotive Parts</p>
            <div className="hub-stats">
              <span>120+ MSMEs</span>
              <span>Active Coverage</span>
            </div>
          </div>
          
          <div className="hub-card">
            <div className="hub-icon">⚙️</div>
            <h3>Mayapuri Industrial Area</h3>
            <p>Auto Parts & Machinery</p>
            <div className="hub-stats">
              <span>100+ MSMEs</span>
              <span>Active Coverage</span>
            </div>
          </div>
          
          <div className="hub-card">
            <div className="hub-icon">🔧</div>
            <h3>Wazirpur Industrial Area</h3>
            <p>General Manufacturing</p>
            <div className="hub-stats">
              <span>130+ MSMEs</span>
              <span>Active Coverage</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2 className="section-title">Why Choose MKSS Logistics?</h2>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🌱</div>
            <h3>Sustainable Operations</h3>
            <p>Eco-friendly routing and carbon footprint reduction for responsible logistics.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🤝</div>
            <h3>Ethical Practices</h3>
            <p>Fair wages for drivers and transparent pricing for all stakeholders.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>AI-Powered Efficiency</h3>
            <p>Smart algorithms optimize routes, reduce costs, and improve delivery times.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Multi-language Support</h3>
            <p>Available in Hindi, English, and Punjabi for inclusive accessibility.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Transform Your Logistics?</h2>
          <p>Join Delhi's most trusted logistics platform and experience the difference</p>
          <div className="cta-buttons">
            <Link to="/register" className="cta-button primary">Get Started Today</Link>
            <Link to="/login" className="cta-button secondary">Sign In</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;