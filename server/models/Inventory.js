import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
  itemId: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  warehouseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Item details
  itemName: {
    type: String,
    required: true,
    trim: true
  },
  sku: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  category: {
    type: String,
    required: true,
    enum: ['electronics', 'textiles', 'automotive', 'tools', 'chemicals', 'food', 'general']
  },
  description: {
    type: String,
    trim: true
  },
  
  // Quantity and stock management
  quantity: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  minThreshold: {
    type: Number,
    required: true,
    min: 0,
    default: 10
  },
  maxCapacity: {
    type: Number,
    required: true,
    min: 0
  },
  reservedQuantity: {
    type: Number,
    default: 0,
    min: 0
  },
  availableQuantity: {
    type: Number,
    default: 0,
    min: 0
  },
  
  // Pricing
  unitPrice: {
    type: Number,
    required: true,
    min: 0
  },
  totalValue: {
    type: Number,
    default: 0,
    min: 0
  },
  currency: {
    type: String,
    default: 'INR'
  },
  
  // Physical details
  dimensions: {
    length: Number, // in cm
    width: Number,  // in cm
    height: Number, // in cm
    weight: Number  // in kg
  },
  
  // Storage location
  location: {
    zone: {
      type: String,
      required: true
    },
    aisle: String,
    shelf: String,
    bin: String,
    locationCode: {
      type: String,
      required: true
    }
  },
  
  // Supplier information
  supplier: {
    name: {
      type: String,
      required: true
    },
    contactPerson: String,
    phone: String,
    email: String,
    address: String
  },
  
  // Dates and tracking
  arrivalDate: {
    type: Date,
    required: true
  },
  expiryDate: {
    type: Date,
    default: null
  },
  lastMovementDate: {
    type: Date,
    default: Date.now
  },
  
  // Status and condition
  status: {
    type: String,
    enum: ['in-stock', 'low-stock', 'out-of-stock', 'reserved', 'damaged', 'expired'],
    default: 'in-stock'
  },
  condition: {
    type: String,
    enum: ['new', 'good', 'fair', 'damaged'],
    default: 'new'
  },
  
  // Movement tracking
  movementHistory: [{
    type: {
      type: String,
      enum: ['inbound', 'outbound', 'adjustment', 'transfer', 'damaged', 'expired'],
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    reason: String,
    reference: String, // Order ID, Transfer ID, etc.
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    notes: String
  }],
  
  // Alerts and notifications
  alerts: [{
    type: {
      type: String,
      enum: ['low-stock', 'out-of-stock', 'expiry-warning', 'damaged'],
      required: true
    },
    message: String,
    isActive: {
      type: Boolean,
      default: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Additional metadata
  tags: [String],
  barcode: String,
  qrCode: String,
  images: [String],
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes
inventorySchema.index({ itemId: 1 });
inventorySchema.index({ sku: 1 });
inventorySchema.index({ warehouseId: 1 });
inventorySchema.index({ category: 1 });
inventorySchema.index({ status: 1 });
inventorySchema.index({ 'location.locationCode': 1 });
inventorySchema.index({ arrivalDate: 1 });
inventorySchema.index({ expiryDate: 1 });

// Virtual for available quantity
inventorySchema.virtual('actualAvailableQuantity').get(function() {
  return Math.max(0, this.quantity - this.reservedQuantity);
});

// Virtual for stock status
inventorySchema.virtual('stockStatus').get(function() {
  if (this.quantity === 0) return 'out-of-stock';
  if (this.quantity <= this.minThreshold) return 'low-stock';
  return 'in-stock';
});

// Virtual for days until expiry
inventorySchema.virtual('daysUntilExpiry').get(function() {
  if (!this.expiryDate) return null;
  const now = new Date();
  const expiry = new Date(this.expiryDate);
  const diffTime = expiry - now;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Method to update quantity
inventorySchema.methods.updateQuantity = function(newQuantity, type, reason, performedBy, reference = null) {
  const oldQuantity = this.quantity;
  const quantityChange = newQuantity - oldQuantity;
  
  this.quantity = newQuantity;
  this.availableQuantity = Math.max(0, newQuantity - this.reservedQuantity);
  this.totalValue = newQuantity * this.unitPrice;
  this.lastMovementDate = new Date();
  this.updatedAt = new Date();
  
  // Update status based on new quantity
  this.status = this.stockStatus;
  
  // Add movement history
  this.movementHistory.push({
    type,
    quantity: quantityChange,
    reason,
    reference,
    performedBy,
    timestamp: new Date()
  });
  
  // Check for alerts
  this.checkAndCreateAlerts();
  
  return this.save();
};

// Method to reserve quantity
inventorySchema.methods.reserveQuantity = function(quantity, reason, performedBy, reference = null) {
  if (this.actualAvailableQuantity < quantity) {
    throw new Error('Insufficient available quantity');
  }
  
  this.reservedQuantity += quantity;
  this.availableQuantity = Math.max(0, this.quantity - this.reservedQuantity);
  this.updatedAt = new Date();
  
  // Add movement history
  this.movementHistory.push({
    type: 'outbound',
    quantity: -quantity,
    reason: reason || 'Reserved',
    reference,
    performedBy,
    timestamp: new Date()
  });
  
  return this.save();
};

// Method to release reserved quantity
inventorySchema.methods.releaseReservedQuantity = function(quantity, reason, performedBy, reference = null) {
  this.reservedQuantity = Math.max(0, this.reservedQuantity - quantity);
  this.availableQuantity = Math.max(0, this.quantity - this.reservedQuantity);
  this.updatedAt = new Date();
  
  // Add movement history
  this.movementHistory.push({
    type: 'adjustment',
    quantity: quantity,
    reason: reason || 'Released reservation',
    reference,
    performedBy,
    timestamp: new Date()
  });
  
  return this.save();
};

// Method to check and create alerts
inventorySchema.methods.checkAndCreateAlerts = function() {
  // Clear existing alerts
  this.alerts = this.alerts.filter(alert => !alert.isActive);
  
  // Low stock alert
  if (this.quantity <= this.minThreshold && this.quantity > 0) {
    this.alerts.push({
      type: 'low-stock',
      message: `Stock is running low. Current: ${this.quantity}, Minimum: ${this.minThreshold}`,
      isActive: true
    });
  }
  
  // Out of stock alert
  if (this.quantity === 0) {
    this.alerts.push({
      type: 'out-of-stock',
      message: 'Item is out of stock',
      isActive: true
    });
  }
  
  // Expiry warning (30 days before expiry)
  if (this.expiryDate) {
    const daysUntilExpiry = this.daysUntilExpiry;
    if (daysUntilExpiry <= 30 && daysUntilExpiry > 0) {
      this.alerts.push({
        type: 'expiry-warning',
        message: `Item expires in ${daysUntilExpiry} days`,
        isActive: true
      });
    }
  }
};

// Static method to generate item ID
inventorySchema.statics.generateItemId = function() {
  const prefix = 'INV';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}${timestamp}${random}`;
};

// Static method to generate SKU
inventorySchema.statics.generateSKU = function(category, itemName) {
  const categoryCode = category.substring(0, 3).toUpperCase();
  const nameCode = itemName.replace(/\s+/g, '').substring(0, 3).toUpperCase();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${categoryCode}-${nameCode}-${random}`;
};

// Pre-save middleware
inventorySchema.pre('save', function(next) {
  // Generate itemId if not exists
  if (this.isNew && !this.itemId) {
    this.itemId = this.constructor.generateItemId();
  }
  
  // Generate SKU if not exists
  if (this.isNew && !this.sku) {
    this.sku = this.constructor.generateSKU(this.category, this.itemName);
  }
  
  // Update calculated fields
  this.availableQuantity = Math.max(0, this.quantity - this.reservedQuantity);
  this.totalValue = this.quantity * this.unitPrice;
  
  // Update status
  this.status = this.stockStatus;
  
  // Check for alerts
  this.checkAndCreateAlerts();
  
  if (this.isModified() && !this.isNew) {
    this.updatedAt = new Date();
  }
  
  next();
});

const Inventory = mongoose.model('Inventory', inventorySchema);

export default Inventory;