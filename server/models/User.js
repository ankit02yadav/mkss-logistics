import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/^[+]?[1-9][\d]{9,14}$/, 'Please enter a valid phone number']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    required: true,
    enum: ['msme', 'driver', 'warehouse'],
    lowercase: true
  },
  language: {
    type: String,
    default: 'en',
    enum: ['en', 'hi', 'pa'] // English, Hindi, Punjabi
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  profileImage: {
    type: String,
    default: null
  },
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String,
    country: {
      type: String,
      default: 'India'
    }
  },
  // Role-specific fields
  msmeDetails: {
    companyName: String,
    businessType: String,
    gstNumber: String,
    industryType: String,
    establishedYear: Number
  },
  driverDetails: {
    licenseNumber: String,
    vehicleType: {
      type: String,
      enum: ['2-wheeler', 'tempo', 'truck']
    },
    vehicleNumber: String,
    experienceYears: Number,
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    totalDeliveries: {
      type: Number,
      default: 0
    }
  },
  warehouseDetails: {
    warehouseName: String,
    capacity: Number,
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        default: [0, 0]
      }
    },
    operatingHours: {
      start: String,
      end: String
    },
    facilities: [String]
  },
  // Timestamps
  lastLogin: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      delete ret.password;
      return ret;
    }
  }
});

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ phone: 1 });
userSchema.index({ role: 1 });
userSchema.index({ isActive: 1 });
userSchema.index({ 'warehouseDetails.location': '2dsphere' });

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return this.name;
});

// Method to get role-specific details
userSchema.methods.getRoleDetails = function() {
  switch(this.role) {
    case 'msme':
      return this.msmeDetails;
    case 'driver':
      return this.driverDetails;
    case 'warehouse':
      return this.warehouseDetails;
    default:
      return null;
  }
};

// Method to update last login
userSchema.methods.updateLastLogin = function() {
  this.lastLogin = new Date();
  return this.save();
};

// Static method to find by email or phone
userSchema.statics.findByEmailOrPhone = function(emailOrPhone) {
  return this.findOne({
    $or: [
      { email: emailOrPhone },
      { phone: emailOrPhone }
    ]
  });
};

// Pre-save middleware to update updatedAt
userSchema.pre('save', function(next) {
  if (this.isModified() && !this.isNew) {
    this.updatedAt = new Date();
  }
  next();
});

const User = mongoose.model('User', userSchema);

export default User;