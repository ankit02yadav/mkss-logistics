import express from 'express';
import Delivery from '../models/Delivery.js';
import User from '../models/User.js';
import { authenticateToken, authorizeRole } from '../middleware/auth.js';

const router = express.Router();

// Create new delivery request (MSME only)
router.post('/', authenticateToken, authorizeRole('msme'), async (req, res) => {
  try {
    const {
      pickupLocation,
      dropLocation,
      cargo,
      vehicleType,
      scheduledPickupTime,
      priority,
      notes
    } = req.body;

    // Calculate base pricing (simplified)
    const baseFare = calculateBaseFare(cargo.weight, vehicleType);
    const totalAmount = baseFare;

    const delivery = new Delivery({
      msmeId: req.user.userId,
      pickupLocation,
      dropLocation,
      cargo,
      vehicleType,
      scheduledPickupTime: new Date(scheduledPickupTime),
      priority: priority || 'medium',
      notes,
      pricing: {
        baseFare,
        totalAmount
      }
    });

    await delivery.save();
    await delivery.populate('msmeId', 'name email phone');

    res.status(201).json({
      success: true,
      message: 'Delivery request created successfully',
      delivery
    });

  } catch (error) {
    console.error('Create delivery error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create delivery request',
      error: error.message
    });
  }
});

// Get deliveries based on user role
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { status, page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    const userId = req.user.userId;
    const userRole = req.user.role;

    let query = {};
    let populateFields = '';

    // Build query based on user role
    switch (userRole) {
      case 'msme':
        query.msmeId = userId;
        populateFields = 'driverId warehouseId';
        break;
      case 'driver':
        query.driverId = userId;
        populateFields = 'msmeId warehouseId';
        break;
      case 'warehouse':
        query.warehouseId = userId;
        populateFields = 'msmeId driverId';
        break;
      default:
        return res.status(403).json({
          success: false,
          message: 'Invalid user role'
        });
    }

    // Add status filter if provided
    if (status) {
      query.status = status;
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query
    const deliveries = await Delivery.find(query)
      .populate(populateFields, 'name email phone')
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Delivery.countDocuments(query);

    res.json({
      success: true,
      deliveries,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        total,
        limit: parseInt(limit)
      }
    });

  } catch (error) {
    console.error('Get deliveries error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch deliveries',
      error: error.message
    });
  }
});

// Get single delivery by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const deliveryId = req.params.id;
    const userId = req.user.userId;
    const userRole = req.user.role;

    const delivery = await Delivery.findById(deliveryId)
      .populate('msmeId', 'name email phone')
      .populate('driverId', 'name email phone')
      .populate('warehouseId', 'name email phone');

    if (!delivery) {
      return res.status(404).json({
        success: false,
        message: 'Delivery not found'
      });
    }

    // Check if user has access to this delivery
    const hasAccess = 
      (userRole === 'msme' && delivery.msmeId._id.toString() === userId) ||
      (userRole === 'driver' && delivery.driverId && delivery.driverId._id.toString() === userId) ||
      (userRole === 'warehouse' && delivery.warehouseId && delivery.warehouseId._id.toString() === userId);

    if (!hasAccess) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      delivery
    });

  } catch (error) {
    console.error('Get delivery error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch delivery',
      error: error.message
    });
  }
});

// Update delivery status
router.patch('/:id/status', authenticateToken, async (req, res) => {
  try {
    const deliveryId = req.params.id;
    const { status, location, notes } = req.body;
    const userId = req.user.userId;
    const userRole = req.user.role;

    const delivery = await Delivery.findById(deliveryId);
    if (!delivery) {
      return res.status(404).json({
        success: false,
        message: 'Delivery not found'
      });
    }

    // Check permissions based on role and status
    const canUpdate = checkStatusUpdatePermission(userRole, userId, delivery, status);
    if (!canUpdate) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this status'
      });
    }

    // Update status
    await delivery.updateStatus(status, location, notes);

    res.json({
      success: true,
      message: 'Delivery status updated successfully',
      delivery
    });

  } catch (error) {
    console.error('Update delivery status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update delivery status',
      error: error.message
    });
  }
});

// Assign driver to delivery (Warehouse only)
router.patch('/:id/assign-driver', authenticateToken, authorizeRole('warehouse'), async (req, res) => {
  try {
    const deliveryId = req.params.id;
    const { driverId } = req.body;

    const delivery = await Delivery.findById(deliveryId);
    if (!delivery) {
      return res.status(404).json({
        success: false,
        message: 'Delivery not found'
      });
    }

    // Verify driver exists and is active
    const driver = await User.findOne({ _id: driverId, role: 'driver', isActive: true });
    if (!driver) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or inactive driver'
      });
    }

    delivery.driverId = driverId;
    delivery.status = 'assigned';
    delivery.updatedAt = new Date();
    await delivery.save();

    await delivery.populate('driverId', 'name email phone');

    res.json({
      success: true,
      message: 'Driver assigned successfully',
      delivery
    });

  } catch (error) {
    console.error('Assign driver error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to assign driver',
      error: error.message
    });
  }
});

// Update delivery location (Driver only)
router.patch('/:id/location', authenticateToken, authorizeRole('driver'), async (req, res) => {
  try {
    const deliveryId = req.params.id;
    const { location } = req.body;
    const userId = req.user.userId;

    const delivery = await Delivery.findById(deliveryId);
    if (!delivery) {
      return res.status(404).json({
        success: false,
        message: 'Delivery not found'
      });
    }

    // Check if driver is assigned to this delivery
    if (!delivery.driverId || delivery.driverId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this delivery'
      });
    }

    // Update location
    delivery.tracking.currentLocation = location;
    delivery.tracking.lastUpdated = new Date();
    delivery.tracking.trackingHistory.push({
      location,
      timestamp: new Date(),
      status: delivery.status,
      notes: 'Location updated'
    });

    await delivery.save();

    res.json({
      success: true,
      message: 'Location updated successfully',
      delivery
    });

  } catch (error) {
    console.error('Update location error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update location',
      error: error.message
    });
  }
});

// Add rating and feedback
router.post('/:id/rating', authenticateToken, async (req, res) => {
  try {
    const deliveryId = req.params.id;
    const { score, feedback, ratingType } = req.body; // ratingType: 'msme' or 'driver'
    const userId = req.user.userId;
    const userRole = req.user.role;

    const delivery = await Delivery.findById(deliveryId);
    if (!delivery) {
      return res.status(404).json({
        success: false,
        message: 'Delivery not found'
      });
    }

    // Check if delivery is completed
    if (delivery.status !== 'delivered') {
      return res.status(400).json({
        success: false,
        message: 'Can only rate completed deliveries'
      });
    }

    // Check permissions and update appropriate rating
    if (userRole === 'msme' && delivery.msmeId.toString() === userId && ratingType === 'driver') {
      delivery.rating.driverRating = {
        score,
        feedback,
        ratedAt: new Date()
      };
    } else if (userRole === 'driver' && delivery.driverId && delivery.driverId.toString() === userId && ratingType === 'msme') {
      delivery.rating.msmeRating = {
        score,
        feedback,
        ratedAt: new Date()
      };
    } else {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to add this rating'
      });
    }

    await delivery.save();

    res.json({
      success: true,
      message: 'Rating added successfully',
      delivery
    });

  } catch (error) {
    console.error('Add rating error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add rating',
      error: error.message
    });
  }
});

// Get delivery analytics
router.get('/analytics/summary', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const userRole = req.user.role;
    const { period = '30' } = req.query; // days

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(period));

    let matchQuery = { createdAt: { $gte: startDate } };

    // Add role-specific filters
    switch (userRole) {
      case 'msme':
        matchQuery.msmeId = userId;
        break;
      case 'driver':
        matchQuery.driverId = userId;
        break;
      case 'warehouse':
        matchQuery.warehouseId = userId;
        break;
    }

    const analytics = await Delivery.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: null,
          totalDeliveries: { $sum: 1 },
          completedDeliveries: {
            $sum: { $cond: [{ $eq: ['$status', 'delivered'] }, 1, 0] }
          },
          pendingDeliveries: {
            $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] }
          },
          inTransitDeliveries: {
            $sum: { $cond: [{ $in: ['$status', ['picked', 'in-transit']] }, 1, 0] }
          },
          totalRevenue: { $sum: '$pricing.totalAmount' },
          averageRating: { $avg: '$rating.driverRating.score' }
        }
      }
    ]);

    const result = analytics[0] || {
      totalDeliveries: 0,
      completedDeliveries: 0,
      pendingDeliveries: 0,
      inTransitDeliveries: 0,
      totalRevenue: 0,
      averageRating: 0
    };

    res.json({
      success: true,
      analytics: result,
      period: parseInt(period)
    });

  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch analytics',
      error: error.message
    });
  }
});

// Helper functions
function calculateBaseFare(weight, vehicleType) {
  const baseRates = {
    '2-wheeler': 50,
    'tempo': 100,
    'truck': 200
  };
  
  const weightMultiplier = Math.ceil(weight / 10) * 0.1;
  return baseRates[vehicleType] * (1 + weightMultiplier);
}

function checkStatusUpdatePermission(userRole, userId, delivery, newStatus) {
  switch (userRole) {
    case 'driver':
      return delivery.driverId && delivery.driverId.toString() === userId &&
             ['picked', 'in-transit', 'delivered'].includes(newStatus);
    case 'warehouse':
      return delivery.warehouseId && delivery.warehouseId.toString() === userId &&
             ['assigned', 'cancelled'].includes(newStatus);
    case 'msme':
      return delivery.msmeId.toString() === userId &&
             ['cancelled'].includes(newStatus) &&
             ['pending', 'assigned'].includes(delivery.status);
    default:
      return false;
  }
}

export default router;