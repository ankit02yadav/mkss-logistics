import express from 'express';
import Inventory from '../models/Inventory.js';
import { authenticateToken, authorizeRole } from '../middleware/auth.js';

const router = express.Router();

// Create new inventory item (Warehouse only)
router.post('/', authenticateToken, authorizeRole('warehouse'), async (req, res) => {
  try {
    const {
      itemName,
      category,
      description,
      quantity,
      minThreshold,
      maxCapacity,
      unitPrice,
      dimensions,
      location,
      supplier,
      arrivalDate,
      expiryDate,
      condition,
      tags
    } = req.body;

    const inventory = new Inventory({
      warehouseId: req.user.userId,
      itemName,
      category,
      description,
      quantity: parseInt(quantity),
      minThreshold: parseInt(minThreshold),
      maxCapacity: parseInt(maxCapacity),
      unitPrice: parseFloat(unitPrice),
      dimensions,
      location,
      supplier,
      arrivalDate: new Date(arrivalDate),
      expiryDate: expiryDate ? new Date(expiryDate) : null,
      condition: condition || 'new',
      tags: tags || []
    });

    await inventory.save();

    res.status(201).json({
      success: true,
      message: 'Inventory item created successfully',
      inventory
    });

  } catch (error) {
    console.error('Create inventory error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create inventory item',
      error: error.message
    });
  }
});

// Get inventory items
router.get('/', authenticateToken, async (req, res) => {
  try {
    const {
      category,
      status,
      search,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const userRole = req.user.role;
    const userId = req.user.userId;

    // Build query based on user role
    let query = {};
    
    if (userRole === 'warehouse') {
      query.warehouseId = userId;
    } else {
      // MSMEs and drivers can see all inventory
      query = {};
    }

    // Add filters
    if (category) {
      query.category = category;
    }

    if (status) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { itemName: { $regex: search, $options: 'i' } },
        { sku: { $regex: search, $options: 'i' } },
        { 'supplier.name': { $regex: search, $options: 'i' } },
        { 'location.locationCode': { $regex: search, $options: 'i' } }
      ];
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const inventory = await Inventory.find(query)
      .populate('warehouseId', 'name warehouseDetails.warehouseName')
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Inventory.countDocuments(query);

    res.json({
      success: true,
      inventory,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        total,
        limit: parseInt(limit)
      }
    });

  } catch (error) {
    console.error('Get inventory error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch inventory',
      error: error.message
    });
  }
});

// Get single inventory item
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const itemId = req.params.id;

    const inventory = await Inventory.findById(itemId)
      .populate('warehouseId', 'name warehouseDetails.warehouseName')
      .populate('movementHistory.performedBy', 'name');

    if (!inventory) {
      return res.status(404).json({
        success: false,
        message: 'Inventory item not found'
      });
    }

    res.json({
      success: true,
      inventory
    });

  } catch (error) {
    console.error('Get inventory item error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch inventory item',
      error: error.message
    });
  }
});

// Update inventory item (Warehouse only)
router.put('/:id', authenticateToken, authorizeRole('warehouse'), async (req, res) => {
  try {
    const itemId = req.params.id;
    const userId = req.user.userId;
    const updates = req.body;

    const inventory = await Inventory.findById(itemId);
    if (!inventory) {
      return res.status(404).json({
        success: false,
        message: 'Inventory item not found'
      });
    }

    // Check if user owns this inventory item
    if (inventory.warehouseId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this inventory item'
      });
    }

    // Allowed fields for update
    const allowedUpdates = [
      'itemName', 'category', 'description', 'minThreshold', 'maxCapacity',
      'unitPrice', 'dimensions', 'location', 'supplier', 'expiryDate',
      'condition', 'tags'
    ];

    // Filter updates
    const filteredUpdates = {};
    Object.keys(updates).forEach(key => {
      if (allowedUpdates.includes(key)) {
        filteredUpdates[key] = updates[key];
      }
    });

    // Update inventory
    Object.assign(inventory, filteredUpdates);
    await inventory.save();

    res.json({
      success: true,
      message: 'Inventory item updated successfully',
      inventory
    });

  } catch (error) {
    console.error('Update inventory error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update inventory item',
      error: error.message
    });
  }
});

// Update inventory quantity
router.patch('/:id/quantity', authenticateToken, authorizeRole('warehouse'), async (req, res) => {
  try {
    const itemId = req.params.id;
    const userId = req.user.userId;
    const { quantity, type, reason, reference } = req.body;

    const inventory = await Inventory.findById(itemId);
    if (!inventory) {
      return res.status(404).json({
        success: false,
        message: 'Inventory item not found'
      });
    }

    // Check ownership
    if (inventory.warehouseId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this inventory item'
      });
    }

    // Validate quantity
    if (quantity < 0) {
      return res.status(400).json({
        success: false,
        message: 'Quantity cannot be negative'
      });
    }

    // Update quantity
    await inventory.updateQuantity(
      parseInt(quantity),
      type || 'adjustment',
      reason || 'Manual adjustment',
      userId,
      reference
    );

    res.json({
      success: true,
      message: 'Quantity updated successfully',
      inventory
    });

  } catch (error) {
    console.error('Update quantity error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update quantity',
      error: error.message
    });
  }
});

// Reserve inventory quantity
router.patch('/:id/reserve', authenticateToken, async (req, res) => {
  try {
    const itemId = req.params.id;
    const userId = req.user.userId;
    const { quantity, reason, reference } = req.body;

    const inventory = await Inventory.findById(itemId);
    if (!inventory) {
      return res.status(404).json({
        success: false,
        message: 'Inventory item not found'
      });
    }

    // Validate quantity
    if (quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be positive'
      });
    }

    // Reserve quantity
    await inventory.reserveQuantity(
      parseInt(quantity),
      reason || 'Reserved for delivery',
      userId,
      reference
    );

    res.json({
      success: true,
      message: 'Quantity reserved successfully',
      inventory
    });

  } catch (error) {
    console.error('Reserve quantity error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to reserve quantity',
      error: error.message
    });
  }
});

// Release reserved quantity
router.patch('/:id/release', authenticateToken, async (req, res) => {
  try {
    const itemId = req.params.id;
    const userId = req.user.userId;
    const { quantity, reason, reference } = req.body;

    const inventory = await Inventory.findById(itemId);
    if (!inventory) {
      return res.status(404).json({
        success: false,
        message: 'Inventory item not found'
      });
    }

    // Release reserved quantity
    await inventory.releaseReservedQuantity(
      parseInt(quantity),
      reason || 'Released reservation',
      userId,
      reference
    );

    res.json({
      success: true,
      message: 'Reserved quantity released successfully',
      inventory
    });

  } catch (error) {
    console.error('Release quantity error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to release reserved quantity',
      error: error.message
    });
  }
});

// Delete inventory item (Warehouse only)
router.delete('/:id', authenticateToken, authorizeRole('warehouse'), async (req, res) => {
  try {
    const itemId = req.params.id;
    const userId = req.user.userId;

    const inventory = await Inventory.findById(itemId);
    if (!inventory) {
      return res.status(404).json({
        success: false,
        message: 'Inventory item not found'
      });
    }

    // Check ownership
    if (inventory.warehouseId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this inventory item'
      });
    }

    // Check if item has reserved quantity
    if (inventory.reservedQuantity > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete item with reserved quantity'
      });
    }

    await Inventory.findByIdAndDelete(itemId);

    res.json({
      success: true,
      message: 'Inventory item deleted successfully'
    });

  } catch (error) {
    console.error('Delete inventory error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete inventory item',
      error: error.message
    });
  }
});

// Get inventory alerts
router.get('/alerts/active', authenticateToken, authorizeRole('warehouse'), async (req, res) => {
  try {
    const userId = req.user.userId;

    const inventory = await Inventory.find({
      warehouseId: userId,
      'alerts.isActive': true
    }).select('itemName sku alerts location.locationCode quantity minThreshold');

    const alerts = [];
    inventory.forEach(item => {
      item.alerts.forEach(alert => {
        if (alert.isActive) {
          alerts.push({
            itemId: item._id,
            itemName: item.itemName,
            sku: item.sku,
            locationCode: item.location.locationCode,
            alertType: alert.type,
            message: alert.message,
            createdAt: alert.createdAt,
            quantity: item.quantity,
            minThreshold: item.minThreshold
          });
        }
      });
    });

    // Sort by creation date (newest first)
    alerts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({
      success: true,
      alerts,
      count: alerts.length
    });

  } catch (error) {
    console.error('Get alerts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch alerts',
      error: error.message
    });
  }
});

// Get inventory analytics
router.get('/analytics/summary', authenticateToken, authorizeRole('warehouse'), async (req, res) => {
  try {
    const userId = req.user.userId;
    const { period = '30' } = req.query;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(period));

    const analytics = await Inventory.aggregate([
      { $match: { warehouseId: userId } },
      {
        $group: {
          _id: null,
          totalItems: { $sum: 1 },
          totalValue: { $sum: '$totalValue' },
          totalQuantity: { $sum: '$quantity' },
          lowStockItems: {
            $sum: { $cond: [{ $eq: ['$status', 'low-stock'] }, 1, 0] }
          },
          outOfStockItems: {
            $sum: { $cond: [{ $eq: ['$status', 'out-of-stock'] }, 1, 0] }
          },
          averageValue: { $avg: '$totalValue' }
        }
      }
    ]);

    // Category breakdown
    const categoryBreakdown = await Inventory.aggregate([
      { $match: { warehouseId: userId } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          totalValue: { $sum: '$totalValue' },
          totalQuantity: { $sum: '$quantity' }
        }
      },
      { $sort: { count: -1 } }
    ]);

    const result = analytics[0] || {
      totalItems: 0,
      totalValue: 0,
      totalQuantity: 0,
      lowStockItems: 0,
      outOfStockItems: 0,
      averageValue: 0
    };

    res.json({
      success: true,
      analytics: {
        ...result,
        categoryBreakdown
      },
      period: parseInt(period)
    });

  } catch (error) {
    console.error('Get inventory analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch inventory analytics',
      error: error.message
    });
  }
});

export default router;