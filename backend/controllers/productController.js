const Product = require('../models/Product')

// @desc    Get all products with filtering
// @route   GET /api/products
// @access  Public
exports.getAllProducts = async (req, res) => {
  try {
    const { category, search, sort, featured, trending } = req.query
    const filter = { isActive: true }

    if (category && category !== 'all') {
      filter.category = category
    }

    if (search) {
      filter.$text = { $search: search }
    }

    if (featured === 'true') {
      filter.isFeatured = true
    }

    if (trending === 'true') {
      filter.isTrending = true
    }

    let query = Product.find(filter)

    if (sort === 'price-low') {
      query = query.sort({ price: 1 })
    } else if (sort === 'price-high') {
      query = query.sort({ price: -1 })
    } else if (sort === 'newest') {
      query = query.sort({ createdAt: -1 })
    } else if (sort === 'rating') {
      query = query.sort({ 'ratings.average': -1 })
    }

    const products = await query.lean()
    res.status(200).json({
      success: true,
      data: products,
      count: products.length
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('reviews.user', 'name')
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      })
    }
    res.status(200).json({
      success: true,
      data: product
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// @desc    Create product (Admin only)
// @route   POST /api/products
// @access  Private/Admin
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(201).json({
      success: true,
      data: product,
      message: 'Product created successfully'
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

// @desc    Update product (Admin only)
// @route   PUT /api/products/:id
// @access  Private/Admin
exports.updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      })
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })

    res.status(200).json({
      success: true,
      data: product,
      message: 'Product updated successfully'
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

// @desc    Delete product (Admin only)
// @route   DELETE /api/products/:id
// @access  Private/Admin
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      })
    }

    res.status(200).json({
      success: true,
      data: {},
      message: 'Product deleted successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// @desc    Update product stock (Admin only)
// @route   PATCH /api/products/:id/stock
// @access  Private/Admin
exports.updateStock = async (req, res) => {
  try {
    const { quantity } = req.body
    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      })
    }

    product.stock = Math.max(0, product.stock + quantity)
    await product.save()

    res.status(200).json({
      success: true,
      data: product,
      message: `Stock ${quantity > 0 ? 'increased' : 'decreased'} successfully`
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

// @desc    Get low stock products (Admin only)
// @route   GET /api/products/stock/low
// @access  Private/Admin
exports.getLowStockProducts = async (req, res) => {
  try {
    const { threshold = 10 } = req.query
    const products = await Product.find({
      stock: { $lte: parseInt(threshold), $gt: 0 },
      isActive: true
    }).select('name sku stock category')

    res.status(200).json({
      success: true,
      data: products,
      count: products.length
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// @desc    Upload product image (Admin only)
// @route   POST /api/products/:id/upload-image
// @access  Private/Admin
exports.uploadProductImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      })
    }

    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      })
    }

    // In production, use Cloudinary SDK
    const imageData = {
      url: `/uploads/${req.file.filename}`,
      alt: req.body.alt || product.name,
      cloudinaryId: req.body.cloudinaryId || null
    }

    product.images.push(imageData)
    await product.save()

    res.status(200).json({
      success: true,
      data: product,
      message: 'Image uploaded successfully'
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

// @desc    Delete product image (Admin only)
// @route   DELETE /api/products/:id/images/:imageId
// @access  Private/Admin
exports.deleteProductImage = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      })
    }

    product.images = product.images.filter((img) => img._id.toString() !== req.params.imageId)
    await product.save()

    res.status(200).json({
      success: true,
      data: product,
      message: 'Image deleted successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// @desc    Add product review
// @route   POST /api/products/:id/reviews
// @access  Private
exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body
    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      })
    }

    const review = {
      user: req.user._id,
      rating,
      comment,
      date: Date.now()
    }

    product.reviews.push(review)

    // Update average rating
    const avgRating = product.reviews.reduce((sum, rev) => sum + rev.rating, 0) / product.reviews.length
    product.ratings.average = Math.round(avgRating * 10) / 10
    product.ratings.count = product.reviews.length

    await product.save()

    res.status(201).json({
      success: true,
      data: product,
      message: 'Review added successfully'
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
exports.getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({
      isFeatured: true,
      isActive: true
    }).limit(8).lean()

    res.status(200).json({
      success: true,
      data: products
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
