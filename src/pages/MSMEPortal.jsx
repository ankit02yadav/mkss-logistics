import React from 'react';
import { Link } from 'react-router-dom';
import './Portal.css';

const MSMEPortal = () => {
  return (
    <div className="portal-container msme-portal">
      {/* Header */}
      <header className="portal-header">
        <div className="header-content">
          <Link to="/" className="back-link">← Back to Home</Link>
          <div className="portal-title">
            <span className="portal-icon">🏭</span>
            <h1>MSME Portal</h1>
            <p>Micro, Small & Medium Enterprise Solutions</p>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="portal-hero">
        <div className="hero-content">
          <div className="hero-text">
            <h2>Streamline Your Business Logistics</h2>
            <p>
              Access comprehensive logistics solutions designed specifically for MSMEs. 
              Manage deliveries, track shipments, and optimize costs with our integrated platform.
            </p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">500+</span>
                <span className="stat-label">Active MSMEs</span>
              </div>
              <div className="stat">
                <span className="stat-number">30%</span>
                <span className="stat-label">Cost Reduction</span>
              </div>
              <div className="stat">
                <span className="stat-number">95%</span>
                <span className="stat-label">On-time Delivery</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="feature-showcase">
              <div className="showcase-item">
                <span className="showcase-icon">📦</span>
                <span>Delivery Management</span>
              </div>
              <div className="showcase-item">
                <span className="showcase-icon">📍</span>
                <span>Real-time Tracking</span>
              </div>
              <div className="showcase-item">
                <span className="showcase-icon">💰</span>
                <span>Cost Analytics</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="portal-features">
        <div className="section-header">
          <h2>Comprehensive MSME Solutions</h2>
          <p>Everything you need to manage your logistics operations efficiently</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📦</div>
            <h3>Delivery Management</h3>
            <p>Create, schedule, and manage delivery requests with ease. Track multiple shipments from a single dashboard.</p>
            <ul className="feature-list">
              <li>✓ Bulk delivery creation</li>
              <li>✓ Automated scheduling</li>
              <li>✓ Priority handling</li>
              <li>✓ Delivery confirmation</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📍</div>
            <h3>Real-time Tracking</h3>
            <p>Monitor your shipments in real-time with GPS precision and receive instant notifications.</p>
            <ul className="feature-list">
              <li>✓ Live GPS tracking</li>
              <li>✓ SMS/Email alerts</li>
              <li>✓ Delivery proof</li>
              <li>✓ Route optimization</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Cost Optimization</h3>
            <p>Reduce logistics costs through shared resources and intelligent route planning.</p>
            <ul className="feature-list">
              <li>✓ Shared logistics network</li>
              <li>✓ Dynamic pricing</li>
              <li>✓ Cost analytics</li>
              <li>✓ Budget planning</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Analytics Dashboard</h3>
            <p>Gain insights into your logistics performance with comprehensive analytics and reports.</p>
            <ul className="feature-list">
              <li>✓ Performance metrics</li>
              <li>✓ Cost analysis</li>
              <li>✓ Delivery trends</li>
              <li>✓ Custom reports</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🤝</div>
            <h3>Vendor Network</h3>
            <p>Access our verified network of drivers and logistics partners across Delhi's industrial hubs.</p>
            <ul className="feature-list">
              <li>✓ Verified drivers</li>
              <li>✓ Multiple vehicle types</li>
              <li>✓ Competitive rates</li>
              <li>✓ Quality assurance</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Multi-language Support</h3>
            <p>Use the platform in your preferred language - Hindi, English, or Punjabi.</p>
            <ul className="feature-list">
              <li>✓ Hindi interface</li>
              <li>✓ English interface</li>
              <li>✓ Punjabi interface</li>
              <li>✓ Voice commands</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Industrial Hubs */}
      <section className="coverage-section">
        <div className="section-header">
          <h2>Industrial Hub Coverage</h2>
          <p>Serving major industrial areas across Delhi NCR</p>
        </div>
        
        <div className="coverage-grid">
          <div className="coverage-card">
            <div className="coverage-icon">🏭</div>
            <h3>Okhla Industrial Area</h3>
            <p>Electronics & Manufacturing</p>
            <div className="coverage-stats">
              <span>150+ MSMEs</span>
              <span>24/7 Coverage</span>
            </div>
          </div>
          
          <div className="coverage-card">
            <div className="coverage-icon">🧵</div>
            <h3>Bawana Industrial Area</h3>
            <p>Textiles & Automotive</p>
            <div className="coverage-stats">
              <span>120+ MSMEs</span>
              <span>24/7 Coverage</span>
            </div>
          </div>
          
          <div className="coverage-card">
            <div className="coverage-icon">⚙️</div>
            <h3>Mayapuri Industrial Area</h3>
            <p>Auto Parts & Machinery</p>
            <div className="coverage-stats">
              <span>100+ MSMEs</span>
              <span>24/7 Coverage</span>
            </div>
          </div>
          
          <div className="coverage-card">
            <div className="coverage-icon">🔧</div>
            <h3>Wazirpur Industrial Area</h3>
            <p>General Manufacturing</p>
            <div className="coverage-stats">
              <span>130+ MSMEs</span>
              <span>24/7 Coverage</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="pricing-section">
        <div className="section-header">
          <h2>Transparent Pricing</h2>
          <p>Choose the plan that fits your business needs</p>
        </div>
        
        <div className="pricing-grid">
          <div className="pricing-card">
            <div className="pricing-header">
              <h3>Starter</h3>
              <div className="price">
                <span className="currency">₹</span>
                <span className="amount">999</span>
                <span className="period">/month</span>
              </div>
            </div>
            <ul className="pricing-features">
              <li>✓ Up to 50 deliveries/month</li>
              <li>✓ Basic tracking</li>
              <li>✓ Email support</li>
              <li>✓ Mobile app access</li>
            </ul>
            <Link to="/register" className="pricing-button">Get Started</Link>
          </div>
          
          <div className="pricing-card featured">
            <div className="pricing-badge">Most Popular</div>
            <div className="pricing-header">
              <h3>Professional</h3>
              <div className="price">
                <span className="currency">₹</span>
                <span className="amount">2499</span>
                <span className="period">/month</span>
              </div>
            </div>
            <ul className="pricing-features">
              <li>✓ Up to 200 deliveries/month</li>
              <li>✓ Advanced tracking & analytics</li>
              <li>✓ Priority support</li>
              <li>✓ API access</li>
              <li>✓ Custom reports</li>
            </ul>
            <Link to="/register" className="pricing-button">Get Started</Link>
          </div>
          
          <div className="pricing-card">
            <div className="pricing-header">
              <h3>Enterprise</h3>
              <div className="price">
                <span className="currency">₹</span>
                <span className="amount">4999</span>
                <span className="period">/month</span>
              </div>
            </div>
            <ul className="pricing-features">
              <li>✓ Unlimited deliveries</li>
              <li>✓ Full analytics suite</li>
              <li>✓ Dedicated support</li>
              <li>✓ Custom integrations</li>
              <li>✓ White-label options</li>
            </ul>
            <Link to="/register" className="pricing-button">Contact Sales</Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="portal-cta">
        <div className="cta-content">
          <h2>Ready to Transform Your Logistics?</h2>
          <p>Join hundreds of MSMEs already using our platform to streamline their operations</p>
          <div className="cta-buttons">
            <Link to="/register" className="cta-button primary">Start Free Trial</Link>
            <Link to="/login" className="cta-button secondary">Sign In</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MSMEPortal;