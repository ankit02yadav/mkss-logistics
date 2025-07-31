import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  FiPackage, 
  FiPlus, 
  FiEdit, 
  FiTrash2,
  FiSearch,
  FiFilter,
  FiDownload,
  FiUpload,
  FiAlertTriangle,
  FiBarChart3,
  FiTrendingUp,
  FiTrendingDown
} from 'react-icons/fi';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import './InventoryManagement.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const InventoryManagement = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock inventory data
  useEffect(() => {
    const mockInventory = [
      {
        id: 'INV001',
        itemName: 'Electronic Components',
        sku: 'EC-001',
        category: 'Electronics',
        quantity: 150,
        minThreshold: 50,
        maxCapacity: 500,
        unitPrice: 250,
        totalValue: 37500,
        supplier: 'Kumar Electronics',
        location: 'A-01-15',
        lastUpdated: '2024-01-20',
        status: 'in-stock',
        movement: 'stable'
      },
      {
        id: 'INV002',
        itemName: 'Textile Materials',
        sku: 'TM-002',
        category: 'Textiles',
        quantity: 25,
        minThreshold: 50,
        maxCapacity: 200,
        unitPrice: 180,
        totalValue: 4500,
        supplier: 'Sharma Textiles',
        location: 'B-02-08',
        lastUpdated: '2024-01-19',
        status: 'low-stock',
        movement: 'decreasing'
      },
      {
        id: 'INV003',
        itemName: 'Auto Parts',
        sku: 'AP-003',
        category: 'Automotive',
        quantity: 0,
        minThreshold: 30,
        maxCapacity: 150,
        unitPrice: 450,
        totalValue: 0,
        supplier: 'Ali Auto Parts',
        location: 'C-03-22',
        lastUpdated: '2024-01-18',
        status: 'out-of-stock',
        movement: 'critical'
      },
      {
        id: 'INV004',
        itemName: 'Machinery Tools',
        sku: 'MT-004',
        category: 'Tools',
        quantity: 75,
        minThreshold: 20,
        maxCapacity: 100,
        unitPrice: 320,
        totalValue: 24000,
        supplier: 'Industrial Tools Co.',
        location: 'A-01-20',
        lastUpdated: '2024-01-20',
        status: 'in-stock',
        movement: 'increasing'
      },
      {
        id: 'INV005',
        itemName: 'Chemical Supplies',
        sku: 'CS-005',
        category: 'Chemicals',
        quantity: 120,
        minThreshold: 40,
        maxCapacity: 300,
        unitPrice: 150,
        totalValue: 18000,
        supplier: 'Chemical Corp',
        location: 'D-04-10',
        lastUpdated: '2024-01-20',
        status: 'in-stock',
        movement: 'stable'
      }
    ];

    setTimeout(() => {
      setInventory(mockInventory);
      setFilteredInventory(mockInventory);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let filtered = inventory;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCategory) {
      filtered = filtered.filter(item => item.category === filterCategory);
    }

    if (filterStatus) {
      filtered = filtered.filter(item => item.status === filterStatus);
    }

    setFilteredInventory(filtered);
  }, [inventory, searchTerm, filterCategory, filterStatus]);

  const getStatusClass = (status) => {
    switch (status) {
      case 'in-stock':
        return 'status-in-stock';
      case 'low-stock':
        return 'status-low-stock';
      case 'out-of-stock':
        return 'status-out-of-stock';
      default:
        return 'status-in-stock';
    }
  };

  const getMovementIcon = (movement) => {
    switch (movement) {
      case 'increasing':
        return <FiTrendingUp className="movement-up" />;
      case 'decreasing':
        return <FiTrendingDown className="movement-down" />;
      case 'critical':
        return <FiAlertTriangle className="movement-critical" />;
      default:
        return <FiBarChart3 className="movement-stable" />;
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setShowEditModal(true);
  };

  const handleDelete = (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setInventory(prev => prev.filter(item => item.id !== itemId));
    }
  };

  // Chart data
  const categoryData = {
    labels: ['Electronics', 'Textiles', 'Automotive', 'Tools', 'Chemicals'],
    datasets: [
      {
        label: 'Quantity',
        data: [150, 25, 0, 75, 120],
        backgroundColor: [
          'rgba(44, 85, 48, 0.8)',
          'rgba(243, 156, 18, 0.8)',
          'rgba(231, 76, 60, 0.8)',
          'rgba(52, 152, 219, 0.8)',
          'rgba(155, 89, 182, 0.8)',
        ],
      },
    ],
  };

  const movementData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Inbound',
        data: [65, 59, 80, 81, 56, 55],
        borderColor: 'rgba(44, 85, 48, 1)',
        backgroundColor: 'rgba(44, 85, 48, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Outbound',
        data: [28, 48, 40, 19, 86, 27],
        borderColor: 'rgba(243, 156, 18, 1)',
        backgroundColor: 'rgba(243, 156, 18, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const AddItemModal = () => {
    const [formData, setFormData] = useState({
      itemName: '',
      sku: '',
      category: '',
      quantity: '',
      minThreshold: '',
      maxCapacity: '',
      unitPrice: '',
      supplier: '',
      location: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      const newItem = {
        id: `INV${String(inventory.length + 1).padStart(3, '0')}`,
        ...formData,
        quantity: parseInt(formData.quantity),
        minThreshold: parseInt(formData.minThreshold),
        maxCapacity: parseInt(formData.maxCapacity),
        unitPrice: parseFloat(formData.unitPrice),
        totalValue: parseInt(formData.quantity) * parseFloat(formData.unitPrice),
        lastUpdated: new Date().toISOString().split('T')[0],
        status: parseInt(formData.quantity) === 0 ? 'out-of-stock' : 
                parseInt(formData.quantity) < parseInt(formData.minThreshold) ? 'low-stock' : 'in-stock',
        movement: 'stable'
      };
      
      setInventory(prev => [...prev, newItem]);
      setShowAddModal(false);
      setFormData({
        itemName: '',
        sku: '',
        category: '',
        quantity: '',
        minThreshold: '',
        maxCapacity: '',
        unitPrice: '',
        supplier: '',
        location: ''
      });
    };

    const handleChange = (e) => {
      setFormData(prev => ({
        ...prev,
        [e.target.name]: e.target.value
      }));
    };

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h3>Add New Item</h3>
            <button className="modal-close" onClick={() => setShowAddModal(false)}>×</button>
          </div>
          <form onSubmit={handleSubmit} className="inventory-form">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Item Name</label>
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
                <label className="form-label">SKU</label>
                <input
                  type="text"
                  name="sku"
                  className="form-control"
                  value={formData.sku}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
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
                  <option value="Chemicals">Chemicals</option>
                </select>
              </div>
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
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  className="form-control"
                  value={formData.quantity}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Unit Price (₹)</label>
                <input
                  type="number"
                  name="unitPrice"
                  className="form-control"
                  value={formData.unitPrice}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Min Threshold</label>
                <input
                  type="number"
                  name="minThreshold"
                  className="form-control"
                  value={formData.minThreshold}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Max Capacity</label>
                <input
                  type="number"
                  name="maxCapacity"
                  className="form-control"
                  value={formData.maxCapacity}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Location</label>
              <input
                type="text"
                name="location"
                className="form-control"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., A-01-15"
                required
              />
            </div>
            <div className="form-actions">
              <button type="button" className="btn btn-outline" onClick={() => setShowAddModal(false)}>
                Cancel
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
    <div className="inventory-management">
      <div className="container">
        <div className="page-header">
          <div className="page-title">
            <h1>{t('inventoryManagement')}</h1>
            <p>Manage your inventory efficiently with real-time tracking and analytics</p>
          </div>
          <div className="page-actions">
            <button className="btn btn-outline">
              <FiUpload />
              Import
            </button>
            <button className="btn btn-outline">
              <FiDownload />
              Export
            </button>
            <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
              <FiPlus />
              Add Item
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="inventory-summary">
          <div className="summary-card">
            <div className="summary-icon">
              <FiPackage />
            </div>
            <div className="summary-info">
              <div className="summary-value">{inventory.length}</div>
              <div className="summary-label">Total Items</div>
            </div>
          </div>
          <div className="summary-card">
            <div className="summary-icon">
              <FiAlertTriangle />
            </div>
            <div className="summary-info">
              <div className="summary-value">
                {inventory.filter(item => item.status === 'low-stock' || item.status === 'out-of-stock').length}
              </div>
              <div className="summary-label">Low/Out of Stock</div>
            </div>
          </div>
          <div className="summary-card">
            <div className="summary-icon">
              <FiBarChart3 />
            </div>
            <div className="summary-info">
              <div className="summary-value">
                ₹{inventory.reduce((sum, item) => sum + item.totalValue, 0).toLocaleString()}
              </div>
              <div className="summary-label">Total Value</div>
            </div>
          </div>
          <div className="summary-card">
            <div className="summary-icon">
              <FiTrendingUp />
            </div>
            <div className="summary-info">
              <div className="summary-value">
                {inventory.filter(item => item.movement === 'increasing').length}
              </div>
              <div className="summary-label">Trending Up</div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="inventory-controls">
          <div className="search-bar">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search items, SKU, or supplier..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="filter-controls">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="filter-select"
            >
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Textiles">Textiles</option>
              <option value="Automotive">Automotive</option>
              <option value="Tools">Tools</option>
              <option value="Chemicals">Chemicals</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="">All Status</option>
              <option value="in-stock">In Stock</option>
              <option value="low-stock">Low Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
            <button className="btn btn-outline">
              <FiFilter />
              More Filters
            </button>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="inventory-table-section">
          <div className="table-container">
            <table className="inventory-table">
              <thead>
                <tr>
                  <th>Item Details</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Value</th>
                  <th>Status</th>
                  <th>Movement</th>
                  <th>Location</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="item-details">
                        <div className="item-name">{item.itemName}</div>
                        <div className="item-meta">
                          <span className="item-sku">SKU: {item.sku}</span>
                          <span className="item-supplier">{item.supplier}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="category-badge">{item.category}</span>
                    </td>
                    <td>
                      <div className="quantity-info">
                        <div className="quantity-value">{item.quantity}</div>
                        <div className="quantity-threshold">
                          Min: {item.minThreshold} | Max: {item.maxCapacity}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="value-info">
                        <div className="total-value">₹{item.totalValue.toLocaleString()}</div>
                        <div className="unit-price">₹{item.unitPrice}/unit</div>
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${getStatusClass(item.status)}`}>
                        {item.status.replace('-', ' ')}
                      </span>
                    </td>
                    <td>
                      <div className="movement-indicator">
                        {getMovementIcon(item.movement)}
                        <span className="movement-text">{item.movement}</span>
                      </div>
                    </td>
                    <td>
                      <span className="location-code">{item.location}</span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn btn-sm btn-outline"
                          onClick={() => handleEdit(item)}
                        >
                          <FiEdit />
                        </button>
                        <button
                          className="btn btn-sm btn-outline"
                          onClick={() => handleDelete(item.id)}
                        >
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

        {/* Analytics Section */}
        <div className="analytics-section">
          <div className="analytics-grid">
            <div className="chart-container">
              <h3>Inventory by Category</h3>
              <Bar
                data={categoryData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: false,
                    },
                    title: {
                      display: false,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </div>
            <div className="chart-container">
              <h3>Stock Movement Trends</h3>
              <Line
                data={movementData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    title: {
                      display: false,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {showAddModal && <AddItemModal />}
    </div>
  );
};

export default InventoryManagement;