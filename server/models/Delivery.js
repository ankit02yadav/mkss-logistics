import mongoose from 'mongoose';

const deliverySchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  msmeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  warehouseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  
  // Pickup and delivery details
  pickupLocation: {
    address: {
      type: String,
      required: true
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    },
    contactPerson: String,
    contactPhone: String,
    instructions: String
  },
  
  dropLocation: {
    address: {
      type: String,
      required: true
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    },
    contactPerson: String,
    contactPhone: String,
    instructions: String
  },
  
  // Cargo details
  cargo: {
    type: {
      type: String,
      required: true,
      enum: ['electronics', 'textiles', 'automotive', 'food', 'chemicals', 'general']
    },
    weight: {
      type: Number,
      required: true,
      min: 0
    },
    dimensions: {
      length: Number,
      width: Number,
      height: Number
    },
    value: {
      type: Number,
      min: 0
    },
    description: String,
    specialInstructions: String
  },
  
  // Vehicle and transport details
  vehicleType: {
    type: String,
    required: true,
    enum: ['2-wheeler', 'tempo', 'truck']
  },
  
  // Scheduling
  scheduledPickupTime: {
    type: Date,
    required: true
  },
  actualPickupTime: Date,
  estimatedDeliveryTime: Date,
  actualDeliveryTime: Date,
  
  // Status tracking
  status: {
    type: String,
    required: true,
    enum: ['pending', 'assigned', 'picked', 'in-transit', 'delivered', 'cancelled', 'delayed'],
    default: 'pending'
  },
  
  // Pricing
  pricing: {
    baseFare: {
      type: Number,
      required: true,
      min: 0
    },
    distanceCharge: {
      type: Number,
      default: 0
    },
    weightCharge: {
      type: Number,
      default: 0
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0
    },
    currency: {
      type: String,
      default: 'INR'
    }
  },
  
  // Route information
  route: {
    distance: Number, // in kilometers
    duration: Number, // in minutes
    optimizedPath: [[Number]], // Array of coordinates
    avoidanceZones: [{
      name: String,
      reason: String,
      coordinates: [Number]
    }]
  },
  
  // Tracking information
  tracking: {
    currentLocation: {
      type: [Number], // [longitude, latitude]
      default: null
    },
    lastUpdated: Date,
    trackingHistory: [{
      location: [Number],
      timestamp: Date,
      status: String,
      notes: String
    }]
  },
  
  // Payment information
  payment: {
    method: {
      type: String,
      enum: ['cash', 'online', 'wallet', 'credit'],
      default: 'cash'
    },
    status: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending'
    },
    transactionId: String,
    paidAt: Date
  },
  
  // Ratings and feedback
  rating: {
    msmeRating: {
      score: {
        type: Number,
        min: 1,
        max: 5
      },
      feedback: String,
      ratedAt: Date
    },
    driverRating: {
      score: {
        type: Number,
        min: 1,
        max: 5
      },
      feedback: String,
      ratedAt: Date
    }
  },
  
  // Additional information
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  
  notes: String,
  
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
deliverySchema.index({ orderId: 1 });
deliverySchema.index({ msmeId: 1 });
deliverySchema.index({ driverId: 1 });
deliverySchema.index({ warehouseId: 1 });
deliverySchema.index({ status: 1 });
deliverySchema.index({ scheduledPickupTime: 1 });
deliverySchema.index({ 'pickupLocation.coordinates': '2dsphere' });
deliverySchema.index({ 'dropLocation.coordinates': '2dsphere' });
deliverySchema.index({ 'tracking.currentLocation': '2dsphere' });

// Virtual for delivery duration
deliverySchema.virtual('deliveryDuration').get(function() {
  if (this.actualPickupTime && this.actualDeliveryTime) {
    return Math.round((this.actualDeliveryTime - this.actualPickupTime) / (1000 * 60)); // in minutes
  }
  return null;
});

// Method to update status
deliverySchema.methods.updateStatus = function(newStatus, location = null, notes = '') {
  this.status = newStatus;
  this.updatedAt = new Date();
  
  // Update tracking history
  this.tracking.trackingHistory.push({
    location: location || this.tracking.currentLocation,
    timestamp: new Date(),
    status: newStatus,
    notes: notes
  });
  
  // Update current location if provided
  if (location) {
    this.tracking.currentLocation = location;
    this.tracking.lastUpdated = new Date();
  }
  
  // Update specific timestamps based on status
  switch(newStatus) {
    case 'picked':
      this.actualPickupTime = new Date();
      break;
    case 'delivered':
      this.actualDeliveryTime = new Date();
      break;
  }
  
  return this.save();
};

// Method to calculate distance between pickup and drop
deliverySchema.methods.calculateDistance = function() {
  const [pickupLng, pickupLat] = this.pickupLocation.coordinates;
  const [dropLng, dropLat] = this.dropLocation.coordinates;
  
  const R = 6371; // Earth's radius in kilometers
  const dLat = (dropLat - pickupLat) * Math.PI / 180;
  const dLng = (dropLng - pickupLng) * Math.PI / 180;
  
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(pickupLat * Math.PI / 180) * Math.cos(dropLat * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  
  return Math.round(distance * 100) / 100; // Round to 2 decimal places
};

// Static method to generate order ID
deliverySchema.statics.generateOrderId = function() {
  const prefix = 'DEL';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}${timestamp}${random}`;
};

// Pre-save middleware
deliverySchema.pre('save', function(next) {
  if (this.isNew && !this.orderId) {
    this.orderId = this.constructor.generateOrderId();
  }
  
  if (this.isModified() && !this.isNew) {
    this.updatedAt = new Date();
  }
  
  // Calculate route distance if not set
  if (!this.route.distance && this.pickupLocation.coordinates && this.dropLocation.coordinates) {
    this.route.distance = this.calculateDistance();
  }
  
  next();
});

const Delivery = mongoose.model('Delivery', deliverySchema);

export default Delivery;