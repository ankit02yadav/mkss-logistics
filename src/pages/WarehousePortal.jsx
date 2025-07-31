import React from 'react';
import { Link } from 'react-router-dom';
import './Portal.css';

const WarehousePortal = () => {
  return (
    <div className="portal-container warehouse-portal">
      {/* Header */}
      <header className="portal-header">
        <div className="header-content">
          <Link to="/" className="back-link">← Back to Home</Link>
          <div className="portal-title">
            <span className="portal-icon">🏪</span>
            <h1>Warehouse Portal</h1>
            <p>Smart Inventory & Logistics Management</p>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="portal-hero">
        <div className="hero-content">
          <div className="hero-text">
            <h2>Optimize Your Warehouse Operations</h2>
            <p>
              Streamline inventory management, automate scheduling, and gain insights 
              into your warehouse performance with our comprehensive management system.
            </p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">50+</span>
                <span className="stat-label">Partner Warehouses</span>
              </div>
              <div className="stat">
                <span className="stat-number">99.5%</span>
                <span className="stat-label">Inventory Accuracy</span>
              </div>
              <div className="stat">
                <span className="stat-number">40%</span>
                <span className="stat-label">Efficiency Increase</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="feature-showcase">
              <div className="showcase-item">
                <span className="showcase-icon">📋</span>
                <span>Inventory Control</span>
              </div>
              <div className="showcase-item">
                <span className="showcase-icon">🕒</span>
                <span>Smart Scheduling</span>
              </div>
              <div className="showcase-item">
                <span className="showcase-icon">📈</span>
                <span>Analytics Dashboard</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="portal-features">
        <div className="section-header">
          <h2>Complete Warehouse Management</h2>
          <p>Everything you need to run an efficient warehouse operation</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3>Inventory Management</h3>
            <p>Real-time inventory tracking with automated alerts and stock optimization.</p>
            <ul className="feature-list">
              <li>✓ Real-time stock levels</li>
              <li>✓ Automated reorder points</li>
              <li>✓ Barcode/QR scanning</li>
              <li>✓ Batch tracking</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🕒</div>
            <h3>Smart Scheduling</h3>
            <p>Optimize inbound and outbound deliveries with intelligent scheduling system.</p>
            <ul className="feature-list">
              <li>✓ Delivery slot management</li>
              <li>✓ Resource optimization</li>
              <li>✓ Automated notifications</li>
              <li>✓ Capacity planning</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Analytics & Reporting</h3>
            <p>Comprehensive insights into warehouse performance and operational metrics.</p>
            <ul className="feature-list">
              <li>✓ Performance dashboards</li>
              <li>✓ Inventory turnover analysis</li>
              <li>✓ Cost optimization reports</li>
              <li>✓ Predictive analytics</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔔</div>
            <h3>Smart Alerts</h3>
            <p>Stay informed with intelligent notifications and automated alerts.</p>
            <ul className="feature-list">
              <li>✓ Low stock alerts</li>
              <li>✓ Delivery notifications</li>
              <li>✓ System maintenance alerts</li>
              <li>✓ Performance warnings</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🚚</div>
            <h3>Logistics Integration</h3>
            <p>Seamlessly integrate with delivery networks and transportation partners.</p>
            <ul className="feature-list">
              <li>✓ Multi-carrier support</li>
              <li>✓ Automated dispatch</li>
              <li>✓ Route optimization</li>
              <li>✓ Delivery tracking</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Security & Compliance</h3>
            <p>Ensure data security and regulatory compliance with built-in safeguards.</p>
            <ul className="feature-list">
              <li>✓ Data encryption</li>
              <li>✓ Access controls</li>
              <li>✓ Audit trails</li>
              <li>✓ Compliance reporting</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Warehouse Types */}
      <section className="warehouse-types-section">
        <div className="section-header">
          <h2>Warehouse Solutions</h2>
          <p>Tailored solutions for different warehouse types and sizes</p>
        </div>
        
        <div className="warehouse-types-grid">
          <div className="warehouse-type-card">
            <div className="warehouse-icon">🏭</div>
            <h3>Manufacturing Warehouses</h3>
            <p>Raw materials and finished goods management</p>
            <div className="warehouse-features">
              <span>✓ Production planning</span>
              <span>✓ Quality control</span>
              <span>✓ Batch tracking</span>
            </div>
          </div>
          
          <div className="warehouse-type-card">
            <div className="warehouse-icon">📦</div>
            <h3>Distribution Centers</h3>
            <p>High-volume order fulfillment and distribution</p>
            <div className="warehouse-features">
              <span>✓ Order processing</span>
              <span>✓ Pick & pack</span>
              <span>✓ Cross-docking</span>
            </div>
          </div>
          
          <div className="warehouse-type-card">
            <div className="warehouse-icon">🛒</div>
            <h3>E-commerce Fulfillment</h3>
            <p>Online order management and customer delivery</p>
            <div className="warehouse-features">
              <span>✓ Multi-channel integration</span>
              <span>✓ Returns management</span>
              <span>✓ Customer notifications</span>
            </div>
          </div>
          
          <div className="warehouse-type-card">
            <div className="warehouse-icon">❄️</div>
            <h3>Cold Storage</h3>
            <p>Temperature-controlled storage solutions</p>
            <div className="warehouse-features">
              <span>✓ Temperature monitoring</span>
              <span>✓ Expiry tracking</span>
              <span>✓ Compliance reporting</span>
            </div>
          </div>
        </div>
      </section>

      {/* Capacity Management */}
      <section className="capacity-section">
        <div className="section-header">
          <h2>Capacity Optimization</h2>
          <p>Maximize your warehouse efficiency with intelligent capacity management</p>
        </div>
        
        <div className="capacity-grid">
          <div className="capacity-card">
            <div className="capacity-icon">📊</div>
            <h3>Space Utilization</h3>
            <p>Optimize storage space with 3D visualization and layout planning</p>
            <div className="capacity-metrics">
              <div className="metric">
                <span className="metric-value">85%</span>
                <span className="metric-label">Avg. Utilization</span>
              </div>
              <div className="metric">
                <span className="metric-value">30%</span>
                <span className="metric-label">Space Savings</span>
              </div>
            </div>
          </div>
          
          <div className="capacity-card">
            <div className="capacity-icon">⚡</div>
            <h3>Throughput Optimization</h3>
            <p>Increase processing speed with workflow automation</p>
            <div className="capacity-metrics">
              <div className="metric">
                <span className="metric-value">40%</span>
                <span className="metric-label">Faster Processing</span>
              </div>
              <div className="metric">
                <span className="metric-value">99.5%</span>
                <span className="metric-label">Accuracy Rate</span>
              </div>
            </div>
          </div>
          
          <div className="capacity-card">
            <div className="capacity-icon">🎯</div>
            <h3>Resource Planning</h3>
            <p>Optimize staff and equipment allocation based on demand</p>
            <div className="capacity-metrics">
              <div className="metric">
                <span className="metric-value">25%</span>
                <span className="metric-label">Cost Reduction</span>
              </div>
              <div className="metric">
                <span className="metric-value">95%</span>
                <span className="metric-label">On-time Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Partners */}
      <section className="integration-section">
        <div className="section-header">
          <h2>System Integrations</h2>
          <p>Connect with your existing systems and tools</p>
        </div>
        
        <div className="integration-grid">
          <div className="integration-card">
            <div className="integration-icon">💼</div>
            <h3>ERP Systems</h3>
            <p>SAP, Oracle, Microsoft Dynamics</p>
          </div>
          
          <div className="integration-card">
            <div className="integration-icon">🛒</div>
            <h3>E-commerce Platforms</h3>
            <p>Shopify, Amazon, Flipkart</p>
          </div>
          
          <div className="integration-card">
            <div className="integration-icon">📊</div>
            <h3>Analytics Tools</h3>
            <p>Power BI, Tableau, Google Analytics</p>
          </div>
          
          <div className="integration-card">
            <div className="integration-icon">💳</div>
            <h3>Payment Gateways</h3>
            <p>Razorpay, PayU, Paytm</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="pricing-section">
        <div className="section-header">
          <h2>Flexible Pricing Plans</h2>
          <p>Choose the plan that matches your warehouse size and needs</p>
        </div>
        
        <div className="pricing-grid">
          <div className="pricing-card">
            <div className="pricing-header">
              <h3>Small Warehouse</h3>
              <div className="price">
                <span className="currency">₹</span>
                <span className="amount">4,999</span>
                <span className="period">/month</span>
              </div>
            </div>
            <ul className="pricing-features">
              <li>✓ Up to 1,000 SKUs</li>
              <li>✓ Basic inventory management</li>
              <li>✓ Email support</li>
              <li>✓ Standard reporting</li>
            </ul>
            <Link to="/register" className="pricing-button">Get Started</Link>
          </div>
          
          <div className="pricing-card featured">
            <div className="pricing-badge">Most Popular</div>
            <div className="pricing-header">
              <h3>Medium Warehouse</h3>
              <div className="price">
                <span className="currency">₹</span>
                <span className="amount">9,999</span>
                <span className="period">/month</span>
              </div>
            </div>
            <ul className="pricing-features">
              <li>✓ Up to 10,000 SKUs</li>
              <li>✓ Advanced analytics</li>
              <li>✓ Priority support</li>
              <li>✓ API access</li>
              <li>✓ Custom integrations</li>
            </ul>
            <Link to="/register" className="pricing-button">Get Started</Link>
          </div>
          
          <div className="pricing-card">
            <div className="pricing-header">
              <h3>Large Warehouse</h3>
              <div className="price">
                <span className="currency">₹</span>
                <span className="amount">19,999</span>
                <span className="period">/month</span>
              </div>
            </div>
            <ul className="pricing-features">
              <li>✓ Unlimited SKUs</li>
              <li>✓ Full feature suite</li>
              <li>✓ Dedicated support</li>
              <li>✓ Custom development</li>
              <li>✓ Multi-location support</li>
            </ul>
            <Link to="/register" className="pricing-button">Contact Sales</Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="portal-cta">
        <div className="cta-content">
          <h2>Transform Your Warehouse Operations</h2>
          <p>Join leading warehouses already using our platform to optimize their operations</p>
          <div className="cta-buttons">
            <Link to="/register" className="cta-button primary">Start Free Trial</Link>
            <Link to="/login" className="cta-button secondary">Warehouse Login</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WarehousePortal;