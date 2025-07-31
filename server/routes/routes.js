import express from 'express';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Optimize route between two points
router.post('/optimize', authenticateToken, async (req, res) => {
  try {
    const {
      source,
      destination,
      cargoType,
      cargoWeight,
      vehicleType,
      timeConstraints,
      avoidTolls = false,
      avoidHighways = false,
      ecoFriendly = true
    } = req.body;

    // Validate required fields
    if (!source || !destination) {
      return res.status(400).json({
        success: false,
        message: 'Source and destination are required'
      });
    }

    // Mock route optimization (in production, integrate with mapping services)
    const optimizedRoute = await optimizeRoute({
      source,
      destination,
      cargoType,
      cargoWeight: parseFloat(cargoWeight) || 0,
      vehicleType,
      timeConstraints,
      preferences: {
        avoidTolls,
        avoidHighways,
        ecoFriendly
      }
    });

    res.json({
      success: true,
      route: optimizedRoute
    });

  } catch (error) {
    console.error('Route optimization error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to optimize route',
      error: error.message
    });
  }
});

// Get multiple route alternatives
router.post('/alternatives', authenticateToken, async (req, res) => {
  try {
    const { source, destination, vehicleType, preferences = {} } = req.body;

    if (!source || !destination) {
      return res.status(400).json({
        success: false,
        message: 'Source and destination are required'
      });
    }

    // Generate alternative routes
    const alternatives = await generateAlternativeRoutes({
      source,
      destination,
      vehicleType,
      preferences
    });

    res.json({
      success: true,
      alternatives
    });

  } catch (error) {
    console.error('Alternative routes error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate alternative routes',
      error: error.message
    });
  }
});

// Get traffic and road conditions
router.get('/traffic', authenticateToken, async (req, res) => {
  try {
    const { lat, lng, radius = 5000 } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({
        success: false,
        message: 'Latitude and longitude are required'
      });
    }

    // Mock traffic data (integrate with real traffic APIs)
    const trafficData = await getTrafficConditions({
      latitude: parseFloat(lat),
      longitude: parseFloat(lng),
      radius: parseInt(radius)
    });

    res.json({
      success: true,
      traffic: trafficData
    });

  } catch (error) {
    console.error('Traffic data error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch traffic data',
      error: error.message
    });
  }
});

// Get avoidance zones (pollution, congestion, etc.)
router.get('/avoidance-zones', authenticateToken, async (req, res) => {
  try {
    const { lat, lng, radius = 10000, types } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({
        success: false,
        message: 'Latitude and longitude are required'
      });
    }

    const zoneTypes = types ? types.split(',') : ['pollution', 'congestion', 'construction'];
    
    const avoidanceZones = await getAvoidanceZones({
      latitude: parseFloat(lat),
      longitude: parseFloat(lng),
      radius: parseInt(radius),
      types: zoneTypes
    });

    res.json({
      success: true,
      zones: avoidanceZones
    });

  } catch (error) {
    console.error('Avoidance zones error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch avoidance zones',
      error: error.message
    });
  }
});

// Calculate route cost estimation
router.post('/cost-estimate', authenticateToken, async (req, res) => {
  try {
    const {
      distance,
      vehicleType,
      cargoWeight,
      fuelPrice,
      tollRoads = false,
      timeOfDay = 'day'
    } = req.body;

    if (!distance || !vehicleType) {
      return res.status(400).json({
        success: false,
        message: 'Distance and vehicle type are required'
      });
    }

    const costEstimate = calculateRouteCost({
      distance: parseFloat(distance),
      vehicleType,
      cargoWeight: parseFloat(cargoWeight) || 0,
      fuelPrice: parseFloat(fuelPrice) || getCurrentFuelPrice(),
      tollRoads,
      timeOfDay
    });

    res.json({
      success: true,
      estimate: costEstimate
    });

  } catch (error) {
    console.error('Cost estimation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to calculate cost estimate',
      error: error.message
    });
  }
});

// Get ETA prediction
router.post('/eta', authenticateToken, async (req, res) => {
  try {
    const {
      source,
      destination,
      vehicleType,
      departureTime,
      trafficConsideration = true
    } = req.body;

    if (!source || !destination) {
      return res.status(400).json({
        success: false,
        message: 'Source and destination are required'
      });
    }

    const etaPrediction = await calculateETA({
      source,
      destination,
      vehicleType,
      departureTime: departureTime ? new Date(departureTime) : new Date(),
      trafficConsideration
    });

    res.json({
      success: true,
      eta: etaPrediction
    });

  } catch (error) {
    console.error('ETA calculation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to calculate ETA',
      error: error.message
    });
  }
});

// Helper functions (Mock implementations - replace with real APIs)

async function optimizeRoute(params) {
  const {
    source,
    destination,
    cargoType,
    cargoWeight,
    vehicleType,
    preferences
  } = params;

  // Mock coordinates (in production, geocode addresses)
  const sourceCoords = await geocodeAddress(source);
  const destCoords = await geocodeAddress(destination);

  // Calculate distance
  const distance = calculateDistance(sourceCoords, destCoords);
  
  // Generate optimized path
  const optimizedPath = generatePath(sourceCoords, destCoords, preferences);
  
  // Calculate estimates
  const duration = calculateDuration(distance, vehicleType);
  const fuelEstimate = calculateFuelConsumption(distance, vehicleType, cargoWeight);
  const cost = calculateRouteCost({
    distance,
    vehicleType,
    cargoWeight,
    fuelPrice: getCurrentFuelPrice(),
    tollRoads: !preferences.avoidTolls
  });

  return {
    optimizedPath,
    distance: `${distance.toFixed(1)} km`,
    estimatedTime: formatDuration(duration),
    fuelEstimate: `${fuelEstimate.toFixed(1)} L`,
    fuelCost: `₹${cost.fuelCost}`,
    tollCost: `₹${cost.tollCost}`,
    totalCost: `₹${cost.totalCost}`,
    carbonFootprint: `${(fuelEstimate * 2.3).toFixed(1)} kg CO2`,
    trafficCondition: 'moderate',
    avoidanceZones: await getAvoidanceZones({
      latitude: sourceCoords[1],
      longitude: sourceCoords[0],
      radius: distance * 1000,
      types: ['pollution', 'congestion']
    })
  };
}

async function generateAlternativeRoutes(params) {
  const { source, destination, vehicleType, preferences } = params;
  
  // Generate 3 alternative routes
  const routes = [
    {
      name: 'Fastest Route',
      distance: '38.2 km',
      time: '1h 15m',
      fuel: '3.8 L',
      cost: '₹420',
      description: 'Shortest time via highways'
    },
    {
      name: 'Eco-Friendly Route',
      distance: '45.8 km',
      time: '1h 35m',
      fuel: '3.9 L',
      cost: '₹310',
      description: 'Lower emissions, avoids pollution zones'
    },
    {
      name: 'Toll-Free Route',
      distance: '48.3 km',
      time: '1h 45m',
      fuel: '4.8 L',
      cost: '₹280',
      description: 'No toll roads, budget-friendly'
    }
  ];

  return routes;
}

async function getTrafficConditions(params) {
  const { latitude, longitude, radius } = params;
  
  // Mock traffic data
  return {
    currentCondition: 'moderate',
    congestionLevel: 0.6,
    averageSpeed: 35,
    incidents: [
      {
        type: 'accident',
        location: 'Ring Road Junction',
        severity: 'medium',
        delay: '15 minutes'
      }
    ],
    roadClosures: [],
    peakHours: {
      morning: '8:00-10:00',
      evening: '17:00-20:00'
    }
  };
}

async function getAvoidanceZones(params) {
  const { latitude, longitude, radius, types } = params;
  
  // Mock avoidance zones
  const zones = [];
  
  if (types.includes('pollution')) {
    zones.push({
      id: 'pollution_1',
      name: 'High Pollution Zone',
      type: 'pollution',
      location: 'Industrial Area Gate',
      reason: 'High air pollution levels',
      coordinates: [longitude + 0.01, latitude + 0.01],
      severity: 'high',
      activeHours: '24/7'
    });
  }
  
  if (types.includes('congestion')) {
    zones.push({
      id: 'congestion_1',
      name: 'Heavy Traffic Zone',
      type: 'congestion',
      location: 'Ring Road Junction',
      reason: 'Peak hour congestion',
      coordinates: [longitude - 0.01, latitude - 0.01],
      severity: 'medium',
      activeHours: '8:00-10:00, 17:00-20:00'
    });
  }
  
  return zones;
}

function calculateRouteCost(params) {
  const {
    distance,
    vehicleType,
    cargoWeight,
    fuelPrice,
    tollRoads,
    timeOfDay
  } = params;

  // Base fuel consumption rates (L/km)
  const fuelRates = {
    '2-wheeler': 0.03,
    'tempo': 0.08,
    'truck': 0.15
  };

  const fuelConsumption = distance * fuelRates[vehicleType] * (1 + cargoWeight / 1000);
  const fuelCost = fuelConsumption * fuelPrice;
  
  // Toll costs (simplified)
  const tollCost = tollRoads ? distance * 2 : 0;
  
  // Time-based multiplier
  const timeMultiplier = timeOfDay === 'night' ? 1.2 : 1.0;
  
  const totalCost = (fuelCost + tollCost) * timeMultiplier;

  return {
    fuelCost: Math.round(fuelCost),
    tollCost: Math.round(tollCost),
    totalCost: Math.round(totalCost),
    breakdown: {
      baseCost: Math.round(fuelCost + tollCost),
      timeMultiplier,
      finalCost: Math.round(totalCost)
    }
  };
}

async function calculateETA(params) {
  const {
    source,
    destination,
    vehicleType,
    departureTime,
    trafficConsideration
  } = params;

  const sourceCoords = await geocodeAddress(source);
  const destCoords = await geocodeAddress(destination);
  const distance = calculateDistance(sourceCoords, destCoords);
  
  // Base speed by vehicle type (km/h)
  const baseSpeeds = {
    '2-wheeler': 40,
    'tempo': 35,
    'truck': 30
  };

  let speed = baseSpeeds[vehicleType];
  
  if (trafficConsideration) {
    // Adjust for traffic (simplified)
    const hour = departureTime.getHours();
    if ((hour >= 8 && hour <= 10) || (hour >= 17 && hour <= 20)) {
      speed *= 0.7; // 30% slower during peak hours
    }
  }

  const durationHours = distance / speed;
  const arrivalTime = new Date(departureTime.getTime() + durationHours * 60 * 60 * 1000);

  return {
    departureTime: departureTime.toISOString(),
    arrivalTime: arrivalTime.toISOString(),
    duration: formatDuration(durationHours * 60),
    distance: `${distance.toFixed(1)} km`,
    averageSpeed: `${speed.toFixed(1)} km/h`,
    trafficImpact: trafficConsideration ? 'considered' : 'not considered'
  };
}

// Utility functions
async function geocodeAddress(address) {
  // Mock geocoding - in production, use Google Maps or similar API
  const mockCoordinates = {
    'Okhla Phase 1': [77.2500, 28.5355],
    'Okhla Phase 2': [77.2600, 28.5455],
    'Bawana Industrial Area': [77.1025, 28.7041],
    'Mayapuri Industrial Area': [77.1025, 28.6139],
    'Wazirpur Industrial Area': [77.1625, 28.7041]
  };

  return mockCoordinates[address] || [77.2090, 28.6139]; // Default to Delhi center
}

function calculateDistance(coord1, coord2) {
  const [lng1, lat1] = coord1;
  const [lng2, lat2] = coord2;
  
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function generatePath(source, dest, preferences) {
  // Generate intermediate points for the path
  const [srcLng, srcLat] = source;
  const [destLng, destLat] = dest;
  
  const path = [source];
  
  // Add some intermediate points
  const steps = 3;
  for (let i = 1; i < steps; i++) {
    const ratio = i / steps;
    const lng = srcLng + (destLng - srcLng) * ratio;
    const lat = srcLat + (destLat - srcLat) * ratio;
    path.push([lng, lat]);
  }
  
  path.push(dest);
  return path;
}

function calculateDuration(distance, vehicleType) {
  const speeds = {
    '2-wheeler': 40,
    'tempo': 35,
    'truck': 30
  };
  
  return (distance / speeds[vehicleType]) * 60; // in minutes
}

function calculateFuelConsumption(distance, vehicleType, cargoWeight) {
  const baseConsumption = {
    '2-wheeler': 0.03,
    'tempo': 0.08,
    'truck': 0.15
  };
  
  const weightFactor = 1 + (cargoWeight / 1000) * 0.1;
  return distance * baseConsumption[vehicleType] * weightFactor;
}

function getCurrentFuelPrice() {
  return 100; // ₹100 per liter (mock price)
}

function formatDuration(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins}m`;
}

export default router;