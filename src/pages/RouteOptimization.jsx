import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  FiMapPin, 
  FiNavigation, 
  FiClock, 
  FiTruck,
  FiZap,
  FiAlertTriangle,
  FiRefreshCw,
  FiDownload,
  FiSettings
} from 'react-icons/fi';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './RouteOptimization.css';

const RouteOptimization = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [routeData, setRouteData] = useState(null);
  const [optimizationParams, setOptimizationParams] = useState({
    source: '',
    destination: '',
    cargoType: '',
    cargoWeight: '',
    timeConstraints: '',
    vehicleType: '',
    avoidTolls: false,
    avoidHighways: false,
    ecoFriendly: true
  });
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  // Mock optimization results
  const mockOptimizationResult = {
    optimizedPath: [
      [28.5355, 77.2500], // Okhla
      [28.5855, 77.2200], // Intermediate point 1
      [28.6355, 77.1800], // Intermediate point 2
      [28.7041, 77.1025]  // Bawana
    ],
    distance: '42.5 km',
    estimatedTime: '1h 25m',
    fuelEstimate: '4.2 L',
    fuelCost: '₹350',
    tollCost: '₹80',
    carbonFootprint: '9.8 kg CO2',
    trafficCondition: 'moderate',
    avoidanceZones: [
      {
        name: 'Heavy Traffic Zone',
        location: 'Ring Road Junction',
        reason: 'Peak hour congestion',
        coordinates: [28.6139, 77.2090]
      },
      {
        name: 'Pollution Hotspot',
        location: 'Industrial Area Gate',
        reason: 'High air pollution levels',
        coordinates: [28.6500, 77.1500]
      }
    ],
    alternativeRoutes: [
      {
        name: 'Fastest Route',
        distance: '38.2 km',
        time: '1h 15m',
        fuel: '3.8 L',
        cost: '₹420'
      },
      {
        name: 'Eco-Friendly Route',
        distance: '45.8 km',
        time: '1h 35m',
        fuel: '3.9 L',
        cost: '₹310'
      },
      {
        name: 'Toll-Free Route',
        distance: '48.3 km',
        time: '1h 45m',
        fuel: '4.8 L',
        cost: '₹280'
      }
    ]
  };

  const handleOptimize = async () => {
    if (!optimizationParams.source || !optimizationParams.destination) {
      alert('Please enter both source and destination');
      return;
    }

    setIsOptimizing(true);
    
    // Simulate API call
    setTimeout(() => {
      setRouteData(mockOptimizationResult);
      setIsOptimizing(false);
    }, 2000);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setOptimizationParams(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const getTrafficColor = (condition) => {
    switch (condition) {
      case 'light':
        return 'var(--success-color)';
      case 'moderate':
        return 'var(--warning-color)';
      case 'heavy':
        return 'var(--danger-color)';
      default:
        return 'var(--info-color)';
    }
  };

  return (
    <div className="route-optimization">
      <div className="container">
        <div className="page-header">
          <div className="page-title">
            <h1>{t('routeOptimization')}</h1>
            <p>{t('aiPoweredPlanning')}</p>
          </div>
          <div className="page-actions">
            <button className="btn btn-outline">
              <FiDownload />
              Export Route
            </button>
            <button className="btn btn-outline">
              <FiRefreshCw />
              Reset
            </button>
          </div>
        </div>

        <div className="optimization-container">
          <div className="optimization-form-section">
            <div className="form-card">
              <div className="form-header">
                <h3>Route Parameters</h3>
                <button
                  className="btn btn-sm btn-outline"
                  onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                >
                  <FiSettings />
                  Advanced
                </button>
              </div>

              <form className="optimization-form">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">
                      <FiMapPin />
                      {t('source')}
                    </label>
                    <input
                      type="text"
                      name="source"
                      className="form-control"
                      value={optimizationParams.source}
                      onChange={handleInputChange}
                      placeholder="Enter pickup location"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      <FiMapPin />
                      {t('destination')}
                    </label>
                    <input
                      type="text"
                      name="destination"
                      className="form-control"
                      value={optimizationParams.destination}
                      onChange={handleInputChange}
                      placeholder="Enter destination"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">{t('cargoType')}</label>
                    <select
                      name="cargoType"
                      className="form-control form-select"
                      value={optimizationParams.cargoType}
                      onChange={handleInputChange}
                    >
                      <option value="">Select cargo type</option>
                      <option value="electronics">Electronics</option>
                      <option value="textiles">Textiles</option>
                      <option value="automotive">Automotive Parts</option>
                      <option value="food">Food Items</option>
                      <option value="chemicals">Chemicals</option>
                      <option value="general">General Goods</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">{t('cargoWeight')}</label>
                    <input
                      type="text"
                      name="cargoWeight"
                      className="form-control"
                      value={optimizationParams.cargoWeight}
                      onChange={handleInputChange}
                      placeholder="e.g., 50 kg"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">{t('timeConstraints')}</label>
                    <input
                      type="datetime-local"
                      name="timeConstraints"
                      className="form-control"
                      value={optimizationParams.timeConstraints}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Vehicle Type</label>
                    <select
                      name="vehicleType"
                      className="form-control form-select"
                      value={optimizationParams.vehicleType}
                      onChange={handleInputChange}
                    >
                      <option value="">Select vehicle</option>
                      <option value="2-wheeler">{t('twoWheeler')}</option>
                      <option value="tempo">{t('tempo')}</option>
                      <option value="truck">{t('truck')}</option>
                    </select>
                  </div>
                </div>

                {showAdvancedOptions && (
                  <div className="advanced-options">
                    <h4>Advanced Options</h4>
                    <div className="checkbox-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="avoidTolls"
                          checked={optimizationParams.avoidTolls}
                          onChange={handleInputChange}
                        />
                        <span className="checkmark"></span>
                        Avoid toll roads
                      </label>
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="avoidHighways"
                          checked={optimizationParams.avoidHighways}
                          onChange={handleInputChange}
                        />
                        <span className="checkmark"></span>
                        Avoid highways
                      </label>
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="ecoFriendly"
                          checked={optimizationParams.ecoFriendly}
                          onChange={handleInputChange}
                        />
                        <span className="checkmark"></span>
                        Prioritize eco-friendly routes
                      </label>
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  className="btn btn-primary btn-lg optimize-btn"
                  onClick={handleOptimize}
                  disabled={isOptimizing}
                >
                  {isOptimizing ? (
                    <>
                      <div className="spinner"></div>
                      Optimizing Route...
                    </>
                  ) : (
                    <>
                      <FiZap />
                      Optimize Route
                    </>
                  )}
                </button>
              </form>
            </div>

            {routeData && (
              <div className="route-summary-card">
                <div className="summary-header">
                  <h3>{t('optimizedPath')}</h3>
                  <div className="traffic-indicator">
                    <span 
                      className="traffic-dot"
                      style={{ backgroundColor: getTrafficColor(routeData.trafficCondition) }}
                    ></span>
                    Traffic: {routeData.trafficCondition}
                  </div>
                </div>

                <div className="summary-stats">
                  <div className="stat-item">
                    <div className="stat-icon">
                      <FiMapPin />
                    </div>
                    <div className="stat-info">
                      <div className="stat-value">{routeData.distance}</div>
                      <div className="stat-label">Distance</div>
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-icon">
                      <FiClock />
                    </div>
                    <div className="stat-info">
                      <div className="stat-value">{routeData.estimatedTime}</div>
                      <div className="stat-label">{t('eta')}</div>
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-icon">
                      <FiTruck />
                    </div>
                    <div className="stat-info">
                      <div className="stat-value">{routeData.fuelEstimate}</div>
                      <div className="stat-label">{t('fuelEstimate')}</div>
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-icon">
                      <FiZap />
                    </div>
                    <div className="stat-info">
                      <div className="stat-value">{routeData.carbonFootprint}</div>
                      <div className="stat-label">Carbon Footprint</div>
                    </div>
                  </div>
                </div>

                <div className="cost-breakdown">
                  <h4>Cost Breakdown</h4>
                  <div className="cost-items">
                    <div className="cost-item">
                      <span>Fuel Cost:</span>
                      <span>{routeData.fuelCost}</span>
                    </div>
                    <div className="cost-item">
                      <span>Toll Cost:</span>
                      <span>{routeData.tollCost}</span>
                    </div>
                    <div className="cost-item total">
                      <span>Total Cost:</span>
                      <span>₹{parseInt(routeData.fuelCost.replace('₹', '')) + parseInt(routeData.tollCost.replace('₹', ''))}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="map-section">
            <div className="map-card">
              <div className="map-header">
                <h3>Route Visualization</h3>
                <div className="map-controls">
                  <button className="btn btn-sm btn-outline">
                    <FiNavigation />
                    Start Navigation
                  </button>
                </div>
              </div>
              <div className="map-container">
                <MapContainer
                  center={[28.6139, 77.2090]}
                  zoom={11}
                  style={{ height: '500px', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  
                  {routeData && (
                    <>
                      <Polyline
                        positions={routeData.optimizedPath}
                        color="var(--primary-color)"
                        weight={5}
                        opacity={0.8}
                      />
                      
                      {/* Start marker */}
                      <Marker position={routeData.optimizedPath[0]}>
                        <Popup>
                          <div className="map-popup">
                            <h4>Start Point</h4>
                            <p>{optimizationParams.source}</p>
                          </div>
                        </Popup>
                      </Marker>
                      
                      {/* End marker */}
                      <Marker position={routeData.optimizedPath[routeData.optimizedPath.length - 1]}>
                        <Popup>
                          <div className="map-popup">
                            <h4>Destination</h4>
                            <p>{optimizationParams.destination}</p>
                          </div>
                        </Popup>
                      </Marker>

                      {/* Avoidance zones */}
                      {routeData.avoidanceZones.map((zone, index) => (
                        <Marker key={index} position={zone.coordinates}>
                          <Popup>
                            <div className="map-popup warning">
                              <h4>{zone.name}</h4>
                              <p><strong>Location:</strong> {zone.location}</p>
                              <p><strong>Reason:</strong> {zone.reason}</p>
                            </div>
                          </Popup>
                        </Marker>
                      ))}
                    </>
                  )}
                </MapContainer>
              </div>
            </div>

            {routeData && (
              <div className="avoidance-zones-card">
                <div className="zones-header">
                  <h3>{t('avoidanceZones')}</h3>
                  <span className="zones-count">{routeData.avoidanceZones.length} zones</span>
                </div>
                <div className="zones-list">
                  {routeData.avoidanceZones.map((zone, index) => (
                    <div key={index} className="zone-item">
                      <div className="zone-icon">
                        <FiAlertTriangle />
                      </div>
                      <div className="zone-info">
                        <div className="zone-name">{zone.name}</div>
                        <div className="zone-location">{zone.location}</div>
                        <div className="zone-reason">{zone.reason}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {routeData && (
          <div className="alternative-routes-section">
            <h3>Alternative Routes</h3>
            <div className="routes-grid">
              {routeData.alternativeRoutes.map((route, index) => (
                <div key={index} className="route-card">
                  <div className="route-header">
                    <h4>{route.name}</h4>
                    <button className="btn btn-sm btn-outline">
                      Select
                    </button>
                  </div>
                  <div className="route-stats">
                    <div className="route-stat">
                      <span className="stat-label">Distance:</span>
                      <span className="stat-value">{route.distance}</span>
                    </div>
                    <div className="route-stat">
                      <span className="stat-label">Time:</span>
                      <span className="stat-value">{route.time}</span>
                    </div>
                    <div className="route-stat">
                      <span className="stat-label">Fuel:</span>
                      <span className="stat-value">{route.fuel}</span>
                    </div>
                    <div className="route-stat">
                      <span className="stat-label">Cost:</span>
                      <span className="stat-value">{route.cost}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RouteOptimization;