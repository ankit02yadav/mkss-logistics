import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  FiTruck, 
  FiMapPin, 
  FiClock, 
  FiPackage, 
  FiPhone,
  FiCheckCircle,
  FiAlertTriangle,
  FiNavigation,
  FiBarChart3,
  FiRefreshCw
} from 'react-icons/fi';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Dashboard.css';

const DriverDashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [todaysDeliveries, setTodaysDeliveries] = useState([]);
  const [shiftSummary, setShiftSummary] = useState(null);
  const [optimizedRoute, setOptimizedRoute] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  useEffect(() => {
    const mockDeliveries = [
      {
        id: 'DEL001',
        pickupLocation: 'Okhla Phase 1',
        dropLocation: 'Bawana Industrial Area',
        customerName: 'Kumar Electronics',
        customerPhone: '+91 9876543210',
        status: 'picked',
        priority: 'high',
        estimatedTime: '45 mins',
        coordinates: {
          pickup: [28.5355, 77.2500],
          drop: [28.7041, 77.1025]
        }
      },
      {
        id: 'DEL002',
        pickupLocation: 'Okhla Phase 2',
        dropLocation: 'Mayapuri Industrial Area',
        customerName: 'Sharma Textiles',
        customerPhone: '+91 9876543211',
        status: 'pending',
        priority: 'medium',
        estimatedTime: '30 mins',
        coordinates: {
          pickup: [28.5455, 77.2600],
          drop: [28.6139, 77.1025]
        }
      },
      {
        id: 'DEL003',
        pickupLocation: 'Okhla Phase 3',
        dropLocation: 'Wazirpur Industrial Area',
        customerName: 'Ali Auto Parts',
        customerPhone: '+91 9876543212',
        status: 'delivered',
        priority: 'low',
        estimatedTime: '60 mins',
        coordinates: {
          pickup: [28.5555, 77.2700],
          drop: [28.7041, 77.1625]
        }
      }
    ];

    const mockShiftSummary = {
      distanceCovered: '85 km',
      deliveriesCompleted: 8,
      deliveriesPending: 4,
      earnings: '₹1,250',
      fuelUsed: '12 L',
      averageRating: 4.8
    };

    const mockRoute = [
      [28.5355, 77.2500], // Okhla Phase 1
      [28.5455, 77.2600], // Okhla Phase 2
      [28.7041, 77.1025], // Bawana
      [28.6139, 77.1025], // Mayapuri
      [28.7041, 77.1625]  // Wazirpur
    ];

    setTimeout(() => {
      setTodaysDeliveries(mockDeliveries);
      setShiftSummary(mockShiftSummary);
      setOptimizedRoute(mockRoute);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case 'picked':
        return 'status-in-transit';
      case 'delivered':
        return 'status-delivered';
      case 'pending':
        return 'status-pending';
      default:
        return 'status-pending';
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
        return 'priority-low';
      default:
        return 'priority-medium';
    }
  };

  const handleStatusUpdate = (deliveryId, newStatus) => {
    setTodaysDeliveries(prev =>
      prev.map(delivery =>
        delivery.id === deliveryId
          ? { ...delivery, status: newStatus }
          : delivery
      )
    );
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>{t('loading')}</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <div className="dashboard-title">
            <h1>{t('todaysDeliveries')}</h1>
            <p>Hello, {user?.name}! Here are your assigned deliveries for today.</p>
          </div>
          <div className="dashboard-actions">
            <button className="btn btn-primary">
              <FiNavigation />
              Start Navigation
            </button>
            <button className="btn btn-outline">
              <FiRefreshCw />
              Refresh
            </button>
          </div>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon">
              <FiPackage />
            </div>
            <div className="stat-info">
              <div className="stat-number">
                {todaysDeliveries.filter(d => d.status === 'delivered').length}
              </div>
              <div className="stat-label">Completed</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FiTruck />
            </div>
            <div className="stat-info">
              <div className="stat-number">
                {todaysDeliveries.filter(d => d.status === 'picked').length}
              </div>
              <div className="stat-label">In Transit</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FiClock />
            </div>
            <div className="stat-info">
              <div className="stat-number">
                {todaysDeliveries.filter(d => d.status === 'pending').length}
              </div>
              <div className="stat-label">Pending</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FiBarChart3 />
            </div>
            <div className="stat-info">
              <div className="stat-number">₹1,250</div>
              <div className="stat-label">Today's Earnings</div>
            </div>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="dashboard-section">
            <div className="section-header">
              <h2>Delivery List</h2>
              <div className="section-actions">
                <button className="btn btn-sm btn-outline">
                  Sort by Priority
                </button>
              </div>
            </div>
            <div className="delivery-cards">
              {todaysDeliveries.map((delivery) => (
                <div key={delivery.id} className="delivery-card">
                  <div className="delivery-header">
                    <div className="delivery-id">
                      <span className="order-id">{delivery.id}</span>
                      <span className={`priority-badge ${getPriorityClass(delivery.priority)}`}>
                        {delivery.priority}
                      </span>
                    </div>
                    <div className="delivery-status">
                      <span className={`status-badge ${getStatusClass(delivery.status)}`}>
                        {delivery.status}
                      </span>
                    </div>
                  </div>

                  <div className="delivery-locations">
                    <div className="location-item">
                      <div className="location-icon pickup">
                        <FiMapPin />
                      </div>
                      <div className="location-details">
                        <span className="location-label">Pickup</span>
                        <span className="location-address">{delivery.pickupLocation}</span>
                      </div>
                    </div>
                    <div className="location-connector"></div>
                    <div className="location-item">
                      <div className="location-icon drop">
                        <FiMapPin />
                      </div>
                      <div className="location-details">
                        <span className="location-label">Drop</span>
                        <span className="location-address">{delivery.dropLocation}</span>
                      </div>
                    </div>
                  </div>

                  <div className="delivery-customer">
                    <div className="customer-info">
                      <span className="customer-name">{delivery.customerName}</span>
                      <span className="estimated-time">
                        <FiClock />
                        {delivery.estimatedTime}
                      </span>
                    </div>
                    <div className="customer-actions">
                      <button className="btn btn-sm btn-outline">
                        <FiPhone />
                      </button>
                    </div>
                  </div>

                  <div className="delivery-actions">
                    {delivery.status === 'pending' && (
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleStatusUpdate(delivery.id, 'picked')}
                      >
                        <FiCheckCircle />
                        Mark as Picked
                      </button>
                    )}
                    {delivery.status === 'picked' && (
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleStatusUpdate(delivery.id, 'delivered')}
                      >
                        <FiCheckCircle />
                        Mark as Delivered
                      </button>
                    )}
                    {delivery.status === 'delivered' && (
                      <span className="delivery-completed">
                        <FiCheckCircle />
                        Completed
                      </span>
                    )}
                    <button className="btn btn-outline btn-sm">
                      <FiNavigation />
                      Navigate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard-section">
            <div className="section-header">
              <h2>{t('optimizedRoute')}</h2>
              <div className="route-info">
                <span className="route-distance">Total: 85 km</span>
                <span className="route-time">Est. Time: 3h 45m</span>
              </div>
            </div>
            <div className="map-container">
              <MapContainer
                center={[28.6139, 77.2090]}
                zoom={11}
                style={{ height: '400px', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Polyline
                  positions={optimizedRoute}
                  color="var(--primary-color)"
                  weight={4}
                  opacity={0.8}
                />
                {todaysDeliveries.map((delivery, index) => (
                  <React.Fragment key={delivery.id}>
                    <Marker position={delivery.coordinates.pickup}>
                      <Popup>
                        <div className="map-popup">
                          <h4>Pickup - {delivery.id}</h4>
                          <p><strong>Location:</strong> {delivery.pickupLocation}</p>
                          <p><strong>Customer:</strong> {delivery.customerName}</p>
                        </div>
                      </Popup>
                    </Marker>
                    <Marker position={delivery.coordinates.drop}>
                      <Popup>
                        <div className="map-popup">
                          <h4>Drop - {delivery.id}</h4>
                          <p><strong>Location:</strong> {delivery.dropLocation}</p>
                          <p><strong>Customer:</strong> {delivery.customerName}</p>
                        </div>
                      </Popup>
                    </Marker>
                  </React.Fragment>
                ))}
              </MapContainer>
            </div>
            <div className="traffic-alerts">
              <div className="alert-item">
                <FiAlertTriangle className="alert-icon" />
                <span>Heavy traffic on Ring Road - Add 15 mins</span>
              </div>
            </div>
          </div>

          <div className="dashboard-section">
            <div className="section-header">
              <h2>{t('shiftSummary')}</h2>
            </div>
            <div className="shift-summary-grid">
              <div className="summary-card">
                <div className="summary-icon">
                  <FiMapPin />
                </div>
                <div className="summary-info">
                  <div className="summary-value">{shiftSummary?.distanceCovered}</div>
                  <div className="summary-label">Distance Covered</div>
                </div>
              </div>
              <div className="summary-card">
                <div className="summary-icon">
                  <FiPackage />
                </div>
                <div className="summary-info">
                  <div className="summary-value">{shiftSummary?.deliveriesCompleted}</div>
                  <div className="summary-label">Deliveries Completed</div>
                </div>
              </div>
              <div className="summary-card">
                <div className="summary-icon">
                  <FiTruck />
                </div>
                <div className="summary-info">
                  <div className="summary-value">{shiftSummary?.fuelUsed}</div>
                  <div className="summary-label">Fuel Used</div>
                </div>
              </div>
              <div className="summary-card">
                <div className="summary-icon">
                  <FiBarChart3 />
                </div>
                <div className="summary-info">
                  <div className="summary-value">{shiftSummary?.earnings}</div>
                  <div className="summary-label">Earnings</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;