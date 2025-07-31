import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  FiPackage, 
  FiTruck, 
  FiClock, 
  FiAlertTriangle,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiCalendar,
  FiBarChart3,
  FiRefreshCw,
  FiDownload
} from 'react-icons/fi';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import './Dashboard.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const WarehouseDashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [inventory, setInventory] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [stockAlerts, setStockAlerts] = useState([]);
  const [showAddItemForm, setShowAddItemForm] = useState(false);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  useEffect(() => {
    const mockInventory = [
      {
        id: 'INV001',
        itemName: 'Electronic Components',
        quantity: 150,
        locationCode: 'A-01-15',
        arrivalDate: '2024-01-15',
        category: 'Electronics',
        supplier: 'Kumar Electronics',
        status: 'available'
      },
      {
        id: 'INV002',
        itemName: 'Textile Materials',
        quantity: 25,
        locationCode: 'B-02-08',
        arrivalDate: '2024-01-14',
        category: 'Textiles',
        supplier: 'Sharma Textiles',
        status: 'low-stock'
      },
      {
        id: 'INV003',
        itemName: 'Auto Parts',
        quantity: 0,
        locationCode: 'C-03-22',
        arrivalDate: '2024-01-10',
        category: 'Automotive',
        supplier: 'Ali Auto Parts',
        status: 'out-of-stock'
      },
      {
        id: 'INV004',
        itemName: 'Machinery Tools',
        quantity: 75,
        locationCode: 'A-01-20',
        arrivalDate: '2024-01-16',
        category: 'Tools',
        supplier: 'Industrial Tools Co.',
        status: 'available'
      }
    ];

    const mockSchedules = [
      {
        id: 'SCH001',
        type: 'inbound',
        company: 'Kumar Electronics',
        timeSlot: '10:00 AM - 11:00 AM',
        date: '2024-01-20',
        items: 'Electronic Components',
        status: 'confirmed'
      },
      {
        id: 'SCH002',
        type: 'outbound',
        company: 'Sharma Textiles',
        timeSlot: '2:00 PM - 3:00 PM',
        date: '2024-01-20',
        items: 'Textile Materials',
        status: 'pending'
      },
      {
        id: 'SCH003',
        type: 'inbound',
        company: 'Ali Auto Parts',
        timeSlot: '4:00 PM - 5:00 PM',
        date: '2024-01-21',
        items: 'Auto Parts',
        status: 'confirmed'
      }
    ];

    const mockStockAlerts = [
      {
        id: 'ALT001',
        itemName: 'Textile Materials',
        currentStock: 25,
        minThreshold: 50,
        severity: 'warning'
      },
      {
        id: 'ALT002',
        itemName: 'Auto Parts',
        currentStock: 0,
        minThreshold: 30,
        severity: 'critical'
      }
    ];

    setTimeout(() => {
      setInventory(mockInventory);
      setSchedules(mockSchedules);
      setStockAlerts(mockStockAlerts);
      setLoading(false);
    }, 1000);
  }, []);

  const getStockStatusClass = (status) => {
    switch (status) {
      case 'available':
        return 'status-delivered';
      case 'low-stock':
        return 'status-delayed';
      case 'out-of-stock':
        return 'status-pending';
      default:
        return 'status-pending';
    }
  };

  const getScheduleStatusClass = (status) => {
    switch (status) {
      case 'confirmed':
        return 'status-delivered';
      case 'pending':
        return 'status-delayed';
      case 'cancelled':
        return 'status-pending';
      default:
        return 'status-pending';
    }
  };

  // Chart data
  const stockMovementData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Inbound',
        data: [12, 19, 15, 25, 22, 18, 20],
        backgroundColor: 'rgba(44, 85, 48, 0.8)',
      },
      {
        label: 'Outbound',
        data: [8, 15, 12, 20, 18, 15, 17],
        backgroundColor: 'rgba(243, 156, 18, 0.8)',
      },
    ],
  };

  const categoryDistributionData = {
    labels: ['Electronics', 'Textiles', 'Automotive', 'Tools'],
    datasets: [
      {
        data: [150, 25, 0, 75],
        backgroundColor: [
          'rgba(44, 85, 48, 0.8)',
          'rgba(243, 156, 18, 0.8)',
          'rgba(231, 76, 60, 0.8)',
          'rgba(52, 152, 219, 0.8)',
        ],
      },
    ],
  };

  const AddItemForm = () => {
    const [formData, setFormData] = useState({
      itemName: '',
      quantity: '',
      locationCode: '',
      category: '',
      supplier: '',
      arrivalDate: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission
      console.log('Add item:', formData);
      setShowAddItemForm(false);
      // Reset form
      setFormData({
        itemName: '',
        quantity: '',
        locationCode: '',
        category: '',
        supplier: '',
        arrivalDate: ''
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
            <h3>Add New Item</h3>
            <button 
              className="modal-close"
              onClick={() => setShowAddItemForm(false)}
            >
              ×
            </button>
          </div>
          <form onSubmit={handleSubmit} className="add-item-form">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">{t('itemName')}</label>
                <input
                  type="text"
                  name="itemName"
                  className="form-control"
                  value={formData.itemName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">{t('quantity')}</label>
                <input
                  type="number"
                  name="quantity"
                  className="form-control"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">{t('locationCode')}</label>
                <input
                  type="text"
                  name="locationCode"
                  className="form-control"
                  value={formData.locationCode}
                  onChange={handleChange}
                  placeholder="e.g., A-01-15"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  name="category"
                  className="form-control form-select"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Textiles">Textiles</option>
                  <option value="Automotive">Automotive</option>
                  <option value="Tools">Tools</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Supplier</label>
                <input
                  type="text"
                  name="supplier"
                  className="form-control"
                  value={formData.supplier}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">{t('arrivalDate')}</label>
                <input
                  type="date"
                  name="arrivalDate"
                  className="form-control"
                  value={formData.arrivalDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setShowAddItemForm(false)}
              >
                {t('cancel')}
              </button>
              <button type="submit" className="btn btn-primary">
                Add Item
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
            <h1>Micro-Warehouse Dashboard</h1>
            <p>Hello, {user?.name}! Manage your warehouse operations efficiently.</p>
          </div>
          <div className="dashboard-actions">
            <button
              className="btn btn-primary"
              onClick={() => setShowAddItemForm(true)}
            >
              <FiPlus />
              Add Item
            </button>
            <button className="btn btn-outline">
              <FiDownload />
              Export
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
              <div className="stat-number">{inventory.length}</div>
              <div className="stat-label">Total Items</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FiAlertTriangle />
            </div>
            <div className="stat-info">
              <div className="stat-number">{stockAlerts.length}</div>
              <div className="stat-label">Stock Alerts</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FiTruck />
            </div>
            <div className="stat-info">
              <div className="stat-number">
                {schedules.filter(s => s.type === 'inbound').length}
              </div>
              <div className="stat-label">Inbound Today</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FiClock />
            </div>
            <div className="stat-info">
              <div className="stat-number">
                {schedules.filter(s => s.type === 'outbound').length}
              </div>
              <div className="stat-label">Outbound Today</div>
            </div>
          </div>
        </div>

        {/* Stock Alerts */}
        {stockAlerts.length > 0 && (
          <div className="alerts-section">
            <h3>{t('stockAlerts')}</h3>
            <div className="alerts-grid">
              {stockAlerts.map((alert) => (
                <div key={alert.id} className={`alert-card ${alert.severity}`}>
                  <div className="alert-icon">
                    <FiAlertTriangle />
                  </div>
                  <div className="alert-content">
                    <h4>{alert.itemName}</h4>
                    <p>
                      Current: {alert.currentStock} | Min: {alert.minThreshold}
                    </p>
                  </div>
                  <div className="alert-actions">
                    <button className="btn btn-sm btn-primary">
                      Reorder
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="dashboard-content">
          <div className="dashboard-section">
            <div className="section-header">
              <h2>{t('currentInventory')}</h2>
              <div className="section-actions">
                <button className="btn btn-sm btn-outline">
                  Filter
                </button>
              </div>
            </div>
            <div className="inventory-table-container">
              <table className="table inventory-table">
                <thead>
                  <tr>
                    <th>Item ID</th>
                    <th>{t('itemName')}</th>
                    <th>{t('quantity')}</th>
                    <th>{t('locationCode')}</th>
                    <th>Category</th>
                    <th>{t('arrivalDate')}</th>
                    <th>{t('status')}</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <span className="item-id">{item.id}</span>
                      </td>
                      <td>
                        <div className="item-info">
                          <span className="item-name">{item.itemName}</span>
                          <span className="item-supplier">{item.supplier}</span>
                        </div>
                      </td>
                      <td>
                        <span className={`quantity ${item.quantity === 0 ? 'zero' : item.quantity < 50 ? 'low' : ''}`}>
                          {item.quantity}
                        </span>
                      </td>
                      <td>
                        <span className="location-code">{item.locationCode}</span>
                      </td>
                      <td>
                        <span className="category">{item.category}</span>
                      </td>
                      <td>
                        <span className="arrival-date">{item.arrivalDate}</span>
                      </td>
                      <td>
                        <span className={`status-badge ${getStockStatusClass(item.status)}`}>
                          {item.status.replace('-', ' ')}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="btn btn-sm btn-outline">
                            <FiEdit />
                          </button>
                          <button className="btn btn-sm btn-outline">
                            <FiTrash2 />
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
              <h2>{t('scheduling')}</h2>
              <div className="section-actions">
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => setShowScheduleForm(true)}
                >
                  <FiCalendar />
                  Book Slot
                </button>
              </div>
            </div>
            <div className="schedule-cards">
              {schedules.map((schedule) => (
                <div key={schedule.id} className="schedule-card">
                  <div className="schedule-header">
                    <div className="schedule-type">
                      <span className={`type-badge ${schedule.type}`}>
                        {schedule.type}
                      </span>
                      <span className="schedule-id">{schedule.id}</span>
                    </div>
                    <span className={`status-badge ${getScheduleStatusClass(schedule.status)}`}>
                      {schedule.status}
                    </span>
                  </div>
                  <div className="schedule-details">
                    <div className="schedule-company">
                      <strong>{schedule.company}</strong>
                    </div>
                    <div className="schedule-time">
                      <FiClock />
                      {schedule.timeSlot} - {schedule.date}
                    </div>
                    <div className="schedule-items">
                      <FiPackage />
                      {schedule.items}
                    </div>
                  </div>
                  <div className="schedule-actions">
                    <button className="btn btn-sm btn-outline">
                      <FiEdit />
                      Edit
                    </button>
                    <button className="btn btn-sm btn-outline">
                      Notify
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard-section">
            <div className="section-header">
              <h2>{t('analytics')}</h2>
            </div>
            <div className="analytics-grid">
              <div className="chart-container">
                <h3>{t('stockMovements')}</h3>
                <Bar
                  data={stockMovementData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                      title: {
                        display: true,
                        text: 'Weekly Stock Movement',
                      },
                    },
                  }}
                />
              </div>
              <div className="chart-container">
                <h3>Category Distribution</h3>
                <Doughnut
                  data={categoryDistributionData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'bottom',
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {showAddItemForm && <AddItemForm />}
    </div>
  );
};

export default WarehouseDashboard;