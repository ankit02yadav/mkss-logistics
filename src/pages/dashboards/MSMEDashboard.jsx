import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  FiTruck, 
  FiMapPin, 
  FiClock, 
  FiPackage, 
  FiPlus,
  FiEye,
  FiPhone,
  FiFilter,
  FiRefreshCw
} from 'react-icons/fi';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Dashboard.css';

const MSMEDashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [activeDeliveries, setActiveDeliveries] = useState([]);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [mapFilter, setMapFilter] = useState('my-orders');
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  useEffect(() => {
    const mockDeliveries = [
      {
        id: 'DEL001',
        destination: 'Bawana Industrial Area',
        driverName: 'Rajesh Kumar',
        driverPhone: '+91 9876543210',
        eta: '2:30 PM',
        status: 'in-transit',
        pickupLocation: 'Okhla Phase 1',
        cargoWeight: '50 kg',
        transportType: 'tempo',
        coordinates: [28.7041, 77.1025]
      },
      {
        id: 'DEL002',
        destination: 'Mayapuri Industrial Area',
        driverName: 'Priya Sharma',
        driverPhone: '+91 9876543211',
        eta: '4:15 PM',
        status: 'delivered',
        pickupLocation: 'Okhla Phase 2',
        cargoWeight: '25 kg',
        transportType: '2-wheeler',
        coordinates: [28.6139, 77.1025]
      },
      {
        id: 'DEL003',
        destination: 'Wazirpur Industrial Area',
        driverName: 'Mohammed Ali',
        driverPhone: '+91 9876543212',
        eta: '6:00 PM',
        status: 'delayed',
        pickupLocation: 'Okhla Phase 3',
        cargoWeight: '100 kg',
        transportType: 'truck',
        coordinates: [28.7041, 77.1625]
      }
    ];

    setTimeout(() => {
      setActiveDeliveries(mockDeliveries);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case 'in-transit':
        return 'status-in-transit';
      case 'delivered':
        return 'status-delivered';
      case 'delayed':
        return 'status-delayed';
      default:
        return 'status-pending';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'in-transit':
        return t('inTransit');
      case 'delivered':
        return t('delivered');
      case 'delayed':
        return t('delayed');
      default:
        return t('pending');
    }
  };

  const RequestPickupForm = () => {
    const [formData, setFormData] = useState({
      pickupLocation: '',
      destination: '',
      cargoWeight: '',
      cargoType: '',
      preferredTime: '',
      transportType: '',
      specialInstructions: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission
      console.log('Pickup request:', formData);
      setShowRequestForm(false);
      // Reset form
      setFormData({
        pickupLocation: '',
        destination: '',
        cargoWeight: '',
        cargoType: '',
        preferredTime: '',
        transportType: '',
        specialInstructions: ''
      });
    };

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h3>{t('requestPickup')}</h3>
            <button 
              className="modal-close"
              onClick={() => setShowRequestForm(false)}
            >
              ×
            </button>
          </div>
          <form onSubmit={handleSubmit} className="pickup-form">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">{t('pickupLocation')}</label>
                <input
                  type="text"
                  name="pickupLocation"
                  className="form-control"
                  value={formData.pickupLocation}
                  onChange={handleChange}
                  placeholder="Enter pickup address"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">{t('destination')}</label>
                <input
                  type="text"
                  name="destination"
                  className="form-control"
                  value={formData.destination}
                  onChange={handleChange}
                  placeholder="Enter destination address"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">{t('cargoWeight')}</label>
                <input
                  type="text"
                  name="cargoWeight"
                  className="form-control"
                  value={formData.cargoWeight}
                  onChange={handleChange}
                  placeholder="e.g., 50 kg"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">{t('cargoType')}</label>
                <input
                  type="text"
                  name="cargoType"
                  className="form-control"
                  value={formData.cargoType}
                  onChange={handleChange}
                  placeholder="e.g., Electronics, Textiles"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">{t('preferredTime')}</label>
                <input
                  type="datetime-local"
                  name="preferredTime"
                  className="form-control"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">{t('transportType')}</label>
                <select
                  name="transportType"
                  className="form-control form-select"
                  value={formData.transportType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select transport type</option>
                  <option value="2-wheeler">{t('twoWheeler')}</option>
                  <option value="tempo">{t('tempo')}</option>
                  <option value="truck">{t('truck')}</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Special Instructions</label>
              <textarea
                name="specialInstructions"
                className="form-control"
                rows="3"
                value={formData.specialInstructions}
                onChange={handleChange}
                placeholder="Any special handling instructions..."
              />
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setShowRequestForm(false)}
              >
                {t('cancel')}
              </button>
              <button type="submit" className="btn btn-primary">
                {t('submit')}
              </button>
            </div>
          </form>
        </div>
      </div>
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
            <h1>{t('welcome')}</h1>
            <p>Hello, {user?.name}! Manage your logistics operations efficiently.</p>
          </div>
          <div className="dashboard-actions">
            <button
              className="btn btn-primary"
              onClick={() => setShowRequestForm(true)}
            >
              <FiPlus />
              {t('requestPickup')}
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
              <FiTruck />
            </div>
            <div className="stat-info">
              <div className="stat-number">
                {activeDeliveries.filter(d => d.status === 'in-transit').length}
              </div>
              <div className="stat-label">Active Deliveries</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FiPackage />
            </div>
            <div className="stat-info">
              <div className="stat-number">
                {activeDeliveries.filter(d => d.status === 'delivered').length}
              </div>
              <div className="stat-label">Completed Today</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FiClock />
            </div>
            <div className="stat-info">
              <div className="stat-number">
                {activeDeliveries.filter(d => d.status === 'delayed').length}
              </div>
              <div className="stat-label">Delayed</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FiMapPin />
            </div>
            <div className="stat-info">
              <div className="stat-number">12</div>
              <div className="stat-label">Total This Month</div>
            </div>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="dashboard-section">
            <div className="section-header">
              <h2>{t('activeDeliveries')}</h2>
              <div className="section-actions">
                <button className="btn btn-sm btn-outline">
                  <FiFilter />
                  Filter
                </button>
              </div>
            </div>
            <div className="deliveries-table-container">
              <table className="table deliveries-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>{t('destination')}</th>
                    <th>{t('driverName')}</th>
                    <th>{t('eta')}</th>
                    <th>{t('status')}</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {activeDeliveries.map((delivery) => (
                    <tr key={delivery.id}>
                      <td>
                        <span className="order-id">{delivery.id}</span>
                      </td>
                      <td>
                        <div className="destination-info">
                          <FiMapPin className="location-icon" />
                          {delivery.destination}
                        </div>
                      </td>
                      <td>
                        <div className="driver-info">
                          <span className="driver-name">{delivery.driverName}</span>
                          <span className="driver-phone">{delivery.driverPhone}</span>
                        </div>
                      </td>
                      <td>
                        <div className="eta-info">
                          <FiClock className="clock-icon" />
                          {delivery.eta}
                        </div>
                      </td>
                      <td>
                        <span className={`status-badge ${getStatusClass(delivery.status)}`}>
                          {getStatusText(delivery.status)}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="btn btn-sm btn-outline">
                            <FiEye />
                          </button>
                          <button className="btn btn-sm btn-outline">
                            <FiPhone />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="dashboard-section">
            <div className="section-header">
              <h2>{t('trackOnMap')}</h2>
              <div className="map-filters">
                <button
                  className={`filter-btn ${mapFilter === 'my-orders' ? 'active' : ''}`}
                  onClick={() => setMapFilter('my-orders')}
                >
                  My Orders
                </button>
                <button
                  className={`filter-btn ${mapFilter === 'all-network' ? 'active' : ''}`}
                  onClick={() => setMapFilter('all-network')}
                >
                  All in Network
                </button>
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
                {activeDeliveries.map((delivery) => (
                  <Marker
                    key={delivery.id}
                    position={delivery.coordinates}
                  >
                    <Popup>
                      <div className="map-popup">
                        <h4>{delivery.id}</h4>
                        <p><strong>Driver:</strong> {delivery.driverName}</p>
                        <p><strong>Destination:</strong> {delivery.destination}</p>
                        <p><strong>ETA:</strong> {delivery.eta}</p>
                        <span className={`status-badge ${getStatusClass(delivery.status)}`}>
                          {getStatusText(delivery.status)}
                        </span>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        </div>
      </div>

      {showRequestForm && <RequestPickupForm />}
    </div>
  );
};

export default MSMEDashboard;