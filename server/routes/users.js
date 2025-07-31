import express from 'express';
import User from '../models/User.js';
import { authenticateToken, authorizeRole } from '../middleware/auth.js';

const router = express.Router();

// Get all users (with role-based filtering)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { role, page = 1, limit = 10, search = '' } = req.query;
    const currentUserRole = req.user.role;

    // Build query
    let query = { isActive: true };
    
    if (role) {
      query.role = role;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    // Role-based access control
    if (currentUserRole === 'msme') {
      // MSMEs can see drivers and warehouses
      query.role = { $in: ['driver', 'warehouse'] };
    } else if (currentUserRole === 'driver') {
      // Drivers can see MSMEs and warehouses
      query.role = { $in: ['msme', 'warehouse'] };
    } else if (currentUserRole === 'warehouse') {
      // Warehouses can see all
      // No additional restriction
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const users = await User.find(query)
      .select('-password')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(query);

    res.json({
      success: true,
      users,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        total,
        limit: parseInt(limit)
      }
    });

  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
      error: error.message
    });
  }
});

// Get user by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const userId = req.params.id;
    const currentUserId = req.user.userId;

    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Users can view their own profile or profiles of users they can interact with
    const canView = 
      userId === currentUserId || 
      user.isActive;

    if (!canView) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      user
    });

  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user',
      error: error.message
    });
  }
});

// Update user profile
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const userId = req.params.id;
    const currentUserId = req.user.userId;
    const updates = req.body;

    // Users can only update their own profile
    if (userId !== currentUserId) {
      return res.status(403).json({
        success: false,
        message: 'Can only update your own profile'
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Allowed fields for update
    const allowedUpdates = [
      'name', 'phone', 'language', 'address', 'profileImage',
      'msmeDetails', 'driverDetails', 'warehouseDetails'
    ];

    // Filter updates to only allowed fields
    const filteredUpdates = {};
    Object.keys(updates).forEach(key => {
      if (allowedUpdates.includes(key)) {
        filteredUpdates[key] = updates[key];
      }
    });

    // Update user
    Object.assign(user, filteredUpdates);
    user.updatedAt = new Date();
    await user.save();

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: userResponse
    });

  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile',
      error: error.message
    });
  }
});

// Get available drivers
router.get('/drivers/available', authenticateToken, authorizeRole('warehouse', 'msme'), async (req, res) => {
  try {
    const { vehicleType, location } = req.query;

    let query = {
      role: 'driver',
      isActive: true
    };

    if (vehicleType) {
      query['driverDetails.vehicleType'] = vehicleType;
    }

    const drivers = await User.find(query)
      .select('name phone driverDetails.vehicleType driverDetails.rating driverDetails.totalDeliveries')
      .sort({ 'driverDetails.rating': -1 });

    res.json({
      success: true,
      drivers
    });

  } catch (error) {
    console.error('Get available drivers error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch available drivers',
      error: error.message
    });
  }
});

// Get nearby warehouses
router.get('/warehouses/nearby', authenticateToken, async (req, res) => {
  try {
    const { longitude, latitude, maxDistance = 10000 } = req.query; // maxDistance in meters

    if (!longitude || !latitude) {
      return res.status(400).json({
        success: false,
        message: 'Longitude and latitude are required'
      });
    }

    const warehouses = await User.find({
      role: 'warehouse',
      isActive: true,
      'warehouseDetails.location': {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: parseInt(maxDistance)
        }
      }
    }).select('name phone warehouseDetails');

    res.json({
      success: true,
      warehouses
    });

  } catch (error) {
    console.error('Get nearby warehouses error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch nearby warehouses',
      error: error.message
    });
  }
});

// Update driver rating
router.post('/:id/rating', authenticateToken, async (req, res) => {
  try {
    const driverId = req.params.id;
    const { rating } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      });
    }

    const driver = await User.findOne({ _id: driverId, role: 'driver' });
    if (!driver) {
      return res.status(404).json({
        success: false,
        message: 'Driver not found'
      });
    }

    // Calculate new average rating (simplified)
    const currentRating = driver.driverDetails.rating || 0;
    const totalDeliveries = driver.driverDetails.totalDeliveries || 0;
    
    const newRating = totalDeliveries === 0 
      ? rating 
      : ((currentRating * totalDeliveries) + rating) / (totalDeliveries + 1);

    driver.driverDetails.rating = Math.round(newRating * 10) / 10; // Round to 1 decimal
    await driver.save();

    res.json({
      success: true,
      message: 'Rating updated successfully',
      newRating: driver.driverDetails.rating
    });

  } catch (error) {
    console.error('Update driver rating error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update rating',
      error: error.message
    });
  }
});

// Get user statistics
router.get('/:id/stats', authenticateToken, async (req, res) => {
  try {
    const userId = req.params.id;
    const currentUserId = req.user.userId;

    // Users can only view their own stats or public stats
    if (userId !== currentUserId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    let stats = {
      joinedDate: user.createdAt,
      lastLogin: user.lastLogin,
      isActive: user.isActive
    };

    // Add role-specific stats
    switch (user.role) {
      case 'driver':
        stats = {
          ...stats,
          totalDeliveries: user.driverDetails.totalDeliveries || 0,
          rating: user.driverDetails.rating || 0,
          vehicleType: user.driverDetails.vehicleType
        };
        break;
      case 'msme':
        // Add MSME-specific stats here
        stats = {
          ...stats,
          companyName: user.msmeDetails?.companyName,
          businessType: user.msmeDetails?.businessType
        };
        break;
      case 'warehouse':
        stats = {
          ...stats,
          warehouseName: user.warehouseDetails?.warehouseName,
          capacity: user.warehouseDetails?.capacity
        };
        break;
    }

    res.json({
      success: true,
      stats
    });

  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user statistics',
      error: error.message
    });
  }
});

// Deactivate user account
router.patch('/:id/deactivate', authenticateToken, async (req, res) => {
  try {
    const userId = req.params.id;
    const currentUserId = req.user.userId;

    // Users can only deactivate their own account
    if (userId !== currentUserId) {
      return res.status(403).json({
        success: false,
        message: 'Can only deactivate your own account'
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    user.isActive = false;
    user.updatedAt = new Date();
    await user.save();

    res.json({
      success: true,
      message: 'Account deactivated successfully'
    });

  } catch (error) {
    console.error('Deactivate user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to deactivate account',
      error: error.message
    });
  }
});

export default router;