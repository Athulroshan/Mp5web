const express = require('express');
const { body, validationResult } = require('express-validator');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/customization/calculate-price
// @desc    Calculate price for custom product
// @access  Public
router.post('/calculate-price', [
  body('outfitType').isIn(['Top', 'T-Shirt', 'Bottom', 'Both', 'Accessories', 'Full Set']).withMessage('Invalid outfit type'),
  body('quantity').isInt({ min: 1, max: 100 }).withMessage('Quantity must be between 1 and 100'),
  body('customText').optional().isLength({ max: 50 }).withMessage('Custom text cannot exceed 50 characters'),
  body('selectedColor').isString().withMessage('Color is required')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { outfitType, quantity, customText, selectedColor } = req.body;

    // Base prices for different outfit types
    const basePrices = {
      'Top': 25.00,
      'T-Shirt': 20.00,
      'Bottom': 30.00,
      'Both': 45.00,
      'Accessories': 15.00,
      'Full Set': 60.00
    };

    let basePrice = basePrices[outfitType] || 25.00;

    // Add customization costs
    let customizationCost = 0;
    if (customText) {
      customizationCost += 5.00; // Text customization cost
    }

    // Premium colors might cost more
    const premiumColors = ['gold', 'silver', 'metallic'];
    if (premiumColors.includes(selectedColor.toLowerCase())) {
      customizationCost += 3.00;
    }

    const unitPrice = basePrice + customizationCost;
    const totalPrice = unitPrice * quantity;

    res.json({
      success: true,
      data: {
        unitPrice: unitPrice.toFixed(2),
        totalPrice: totalPrice.toFixed(2),
        breakdown: {
          basePrice: basePrice.toFixed(2),
          customizationCost: customizationCost.toFixed(2),
          quantity,
          unitPrice: unitPrice.toFixed(2)
        }
      }
    });
  } catch (error) {
    console.error('Calculate price error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while calculating price'
    });
  }
});

// @route   POST /api/customization/save-design
// @desc    Save custom design (authenticated users)
// @access  Private
router.post('/save-design', protect, [
  body('outfitType').isIn(['Top', 'T-Shirt', 'Bottom', 'Both', 'Accessories', 'Full Set']).withMessage('Invalid outfit type'),
  body('selectedColor').isString().withMessage('Color is required'),
  body('customText').optional().isLength({ max: 50 }).withMessage('Custom text cannot exceed 50 characters'),
  body('textPlacement').optional().isIn(['Chest', 'Back', 'Sleeve', 'Bottom corner']).withMessage('Invalid text placement'),
  body('designName').optional().isLength({ max: 100 }).withMessage('Design name cannot exceed 100 characters')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { outfitType, selectedColor, customText, textPlacement, designName } = req.body;

    // In a real application, you would save this to a database
    // For now, we'll just return a success response
    const designId = `design_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    res.status(201).json({
      success: true,
      message: 'Design saved successfully',
      data: {
        designId,
        design: {
          outfitType,
          selectedColor,
          customText,
          textPlacement,
          designName: designName || `My ${outfitType} Design`,
          createdAt: new Date().toISOString()
        }
      }
    });
  } catch (error) {
    console.error('Save design error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while saving design'
    });
  }
});

// @route   GET /api/customization/designs
// @desc    Get user's saved designs
// @access  Private
router.get('/designs', protect, async (req, res) => {
  try {
    // In a real application, you would fetch designs from database
    // For now, we'll return mock data
    const mockDesigns = [
      {
        id: 'design_1',
        name: 'My T-Shirt Design',
        outfitType: 'T-Shirt',
        selectedColor: 'blue',
        customText: 'MPSS',
        textPlacement: 'Chest',
        createdAt: new Date().toISOString()
      },
      {
        id: 'design_2',
        name: 'Custom Hoodie',
        outfitType: 'Top',
        selectedColor: 'black',
        customText: 'Custom Text',
        textPlacement: 'Back',
        createdAt: new Date(Date.now() - 86400000).toISOString()
      }
    ];

    res.json({
      success: true,
      data: {
        designs: mockDesigns
      }
    });
  } catch (error) {
    console.error('Get designs error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching designs'
    });
  }
});

// @route   POST /api/customization/order
// @desc    Create custom product order
// @access  Private
router.post('/order', protect, [
  body('outfitType').isIn(['Top', 'T-Shirt', 'Bottom', 'Both', 'Accessories', 'Full Set']).withMessage('Invalid outfit type'),
  body('selectedColor').isString().withMessage('Color is required'),
  body('quantity').isInt({ min: 1, max: 100 }).withMessage('Quantity must be between 1 and 100'),
  body('customText').optional().isLength({ max: 50 }).withMessage('Custom text cannot exceed 50 characters'),
  body('textPlacement').optional().isIn(['Chest', 'Back', 'Sleeve', 'Bottom corner']).withMessage('Invalid text placement'),
  body('shippingAddress').isObject().withMessage('Shipping address is required'),
  body('paymentMethod').isIn(['credit_card', 'debit_card', 'paypal', 'bank_transfer', 'cash_on_delivery']).withMessage('Invalid payment method')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const {
      outfitType,
      selectedColor,
      quantity,
      customText,
      textPlacement,
      shippingAddress,
      paymentMethod,
      designName
    } = req.body;

    // Calculate price
    const basePrices = {
      'Top': 25.00,
      'T-Shirt': 20.00,
      'Bottom': 30.00,
      'Both': 45.00,
      'Accessories': 15.00,
      'Full Set': 60.00
    };

    let basePrice = basePrices[outfitType] || 25.00;
    let customizationCost = 0;

    if (customText) {
      customizationCost += 5.00;
    }

    const premiumColors = ['gold', 'silver', 'metallic'];
    if (premiumColors.includes(selectedColor.toLowerCase())) {
      customizationCost += 3.00;
    }

    const unitPrice = basePrice + customizationCost;
    const subtotal = unitPrice * quantity;
    const tax = subtotal * 0.1; // 10% tax
    const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
    const total = subtotal + tax + shipping;

    // Generate order number
    const orderNumber = `CUSTOM-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

    // In a real application, you would save this to the database
    const order = {
      orderNumber,
      user: req.user.id,
      items: [{
        product: null, // Custom product
        quantity,
        price: unitPrice,
        customization: {
          outfitType,
          selectedColor,
          customText,
          textPlacement,
          designName: designName || `Custom ${outfitType}`
        }
      }],
      subtotal,
      tax,
      shipping,
      total,
      status: 'pending',
      paymentStatus: 'pending',
      paymentMethod,
      shippingAddress,
      estimatedDelivery: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
      createdAt: new Date().toISOString()
    };

    res.status(201).json({
      success: true,
      message: 'Custom order created successfully',
      data: {
        order
      }
    });
  } catch (error) {
    console.error('Create custom order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating custom order'
    });
  }
});

// @route   GET /api/customization/options
// @desc    Get available customization options
// @access  Public
router.get('/options', (req, res) => {
  try {
    const options = {
      outfitTypes: ['Top', 'T-Shirt', 'Bottom', 'Both', 'Accessories', 'Full Set'],
      colors: [
        { name: 'white', hex: '#FFFFFF', border: '#E5E7EB' },
        { name: 'black', hex: '#000000', border: '#374151' },
        { name: 'red', hex: '#EF4444', border: '#DC2626' },
        { name: 'blue', hex: '#3B82F6', border: '#2563EB' },
        { name: 'green', hex: '#10B981', border: '#059669' },
        { name: 'yellow', hex: '#F59E0B', border: '#D97706' },
        { name: 'purple', hex: '#8B5CF6', border: '#7C3AED' },
        { name: 'brown', hex: '#A0522D', border: '#8B4513' },
        { name: 'gray', hex: '#6B7280', border: '#4B5563' },
        { name: 'pink', hex: '#EC4899', border: '#DB2777' },
        { name: 'orange', hex: '#F97316', border: '#EA580C' }
      ],
      textPlacements: ['Chest', 'Back', 'Sleeve', 'Bottom corner'],
      maxTextLength: 50,
      maxQuantity: 100,
      basePrices: {
        'Top': 25.00,
        'T-Shirt': 20.00,
        'Bottom': 30.00,
        'Both': 45.00,
        'Accessories': 15.00,
        'Full Set': 60.00
      },
      customizationCosts: {
        text: 5.00,
        premiumColor: 3.00
      }
    };

    res.json({
      success: true,
      data: {
        options
      }
    });
  } catch (error) {
    console.error('Get options error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching options'
    });
  }
});

module.exports = router; 