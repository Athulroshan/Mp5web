# Product Management System - Documentation

## Overview

This is a comprehensive, production-ready product management system for an e-commerce fashion platform. It includes a modern customer-facing product detail page, admin dashboard for inventory management, and a robust backend API.

## Features

### Customer-Facing Features
- ✅ Premium product detail page with image gallery
- ✅ Image zoom functionality
- ✅ Color and size selection
- ✅ Quantity selector
- ✅ Add to cart functionality
- ✅ Wishlist management
- ✅ Product reviews and ratings
- ✅ Stock availability indicators
- ✅ Related products section
- ✅ Responsive mobile/tablet/desktop design

### Admin Features
- ✅ Complete product CRUD operations
- ✅ Stock management and updates
- ✅ Low-stock alerts
- ✅ Product image upload with Cloudinary
- ✅ Product categorization (Featured, Trending, New Arrival)
- ✅ Batch operations
- ✅ Admin-only authentication
- ✅ Product availability management

## Project Structure

```
src/
├── components/
│   ├── ProductDetail.tsx          # Customer product page
│   └── AdminProductManager.tsx    # Admin management dashboard
├── services/
│   └── productService.ts          # API service layer
└── types/
    └── product.ts                 # TypeScript types

backend/
├── controllers/
│   └── productController.js       # Product business logic
├── models/
│   └── Product.js                 # MongoDB schema
├── routes/
│   └── products.js                # REST API routes
├── middleware/
│   ├── auth.js                    # JWT authentication
│   └── upload.js                  # File upload handling
└── config/
    └── cloudinary.js              # Cloudinary configuration
```

## Installation & Setup

### Prerequisites
- Node.js v14+
- MongoDB
- Cloudinary account (for image storage)
- React 18+

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
MONGODB_URI=mongodb://localhost:27017/mpss
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=5000
EOF

# Install required packages
npm install cloudinary multer-storage-cloudinary multer express-validator

# Start server
npm start
```

### Frontend Setup

```bash
cd src

# Install dependencies (if not already done)
npm install

# Create .env file
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env

# Start development server
npm start
```

## API Endpoints

### Public Routes

```
GET  /api/products              # Get all products with filters
GET  /api/products/:id          # Get single product
GET  /api/products/featured     # Get featured products
```

### Admin Routes (Requires JWT)

```
POST   /api/products                      # Create product
PUT    /api/products/:id                  # Update product
DELETE /api/products/:id                  # Delete product
PATCH  /api/products/:id/stock            # Update stock quantity
GET    /api/products/stock/low            # Get low stock products
POST   /api/products/:id/upload-image     # Upload product image
DELETE /api/products/:id/images/:imageId  # Delete product image
```

### User Routes (Requires JWT)

```
POST /api/products/:id/reviews    # Add product review
```

## Database Schema

### Product Model

```javascript
{
  name: String (required, max 100)
  description: String (required, max 2000)
  sku: String (required, unique)
  category: String (enum: ['shirts', 'jackets', 'dresses', 'pants', 'shoes', 'accessories'])
  price: Number (required, min 0)
  originalPrice: Number (min 0)
  discount: Number (auto-calculated, 0-100)
  stock: Number (required, min 0)
  colors: [String]
  sizes: [String]
  images: [{
    url: String (required),
    alt: String,
    cloudinaryId: String
  }]
  badge: String (enum: ['New', 'Sale', 'Trending', 'Popular', 'Limited'])
  rating: Number (0-5)
  reviews: Number
  isFeatured: Boolean
  isTrending: Boolean
  isNewArrival: Boolean
  isAvailable: Boolean (auto-updated based on stock)
  tags: [String]
  createdAt: Date
  updatedAt: Date
}
```

## Component Usage

### ProductDetail Component

```tsx
import ProductDetail from './components/ProductDetail'

<ProductDetail
  id={1}
  name="Premium Cotton T-Shirt"
  description="Ultra-soft premium cotton with perfect fit..."
  price={450}
  originalPrice={1000}
  rating={4.8}
  reviews={124}
  images={[
    { url: '/image1.jpg', alt: 'Front view' },
    { url: '/image2.jpg', alt: 'Back view' }
  ]}
  colors={['Black', 'White', 'Blue']}
  sizes={['S', 'M', 'L', 'XL']}
  sku="SHIRT-001"
  stock={50}
  category="shirts"
  badge="Sale"
  isWishlisted={false}
  onWishlistToggle={() => {}}
/>
```

### AdminProductManager Component

```tsx
import AdminProductManager from './components/AdminProductManager'

<AdminProductManager
  products={products}
  onProductSave={handleSave}
  onProductDelete={handleDelete}
/>
```

## API Integration Examples

### Fetch Products

```typescript
import { productService } from './services/productService'

// Get all products
const data = await productService.getAllProducts({
  category: 'shirts',
  sort: 'price-low'
})

// Get single product
const product = await productService.getProduct('product-id')

// Get featured products
const featured = await productService.getFeaturedProducts()
```

### Admin Operations

```typescript
// Create product
await productService.createProduct(
  {
    name: 'New Product',
    description: 'Description',
    price: 499,
    category: 'shirts',
    stock: 100
  },
  token
)

// Update stock
await productService.updateStock('product-id', -5, token)

// Upload image
await productService.uploadProductImage(
  'product-id',
  imageFile,
  'Product image',
  token
)

// Get low stock products
const lowStock = await productService.getLowStockProducts(10, token)
```

## Authentication

### JWT Implementation

The system uses JWT (JSON Web Tokens) for admin authentication:

```javascript
// Middleware example
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  
  if (!token) {
    return res.status(401).json({ success: false, message: 'No token' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    
    // Check if user is admin
    if (!decoded.isAdmin) {
      return res.status(403).json({ success: false, message: 'Not authorized' })
    }
    
    next()
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token' })
  }
}
```

## Image Upload with Cloudinary

### Configuration

```javascript
// backend/config/cloudinary.js
const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})
```

### Upload Example

```typescript
const formData = new FormData()
formData.append('image', file)
formData.append('alt', 'Product image')

const response = await fetch(
  `${API_URL}/products/123/upload-image`,
  {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData
  }
)
```

## Styling & UI

The system uses:
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Modern responsive design** for all screen sizes
- **Smooth animations** and hover effects

### Key Components Used

```tsx
import { Heart, Share2, Star, Truck, Shield, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import Button from './ui/Button'
import Input from './ui/Input'
import { Card, CardContent, CardFooter } from './ui/Card'
```

## Error Handling

The system includes comprehensive error handling:

```typescript
try {
  const data = await productService.getAllProducts()
} catch (error) {
  console.error('Error:', error)
  // Show user-friendly error message
  setError('Failed to load products. Please try again.')
}
```

## Performance Optimization

- Image optimization with Cloudinary
- Lazy loading of images
- Debounced search functionality
- Efficient database queries with indexing
- Frontend caching strategies

## Security Features

- JWT-based authentication
- Admin role verification
- Input validation
- File upload restrictions
- CORS configuration
- Rate limiting (recommended to implement)

## Testing Checklist

- [ ] Product listing with filters
- [ ] Single product details
- [ ] Add to cart functionality
- [ ] Wishlist operations
- [ ] Admin product creation
- [ ] Stock management
- [ ] Image upload
- [ ] Low-stock alerts
- [ ] Product deletion
- [ ] Review submission

## Future Enhancements

- [ ] Advanced search with ElasticSearch
- [ ] Product variants management
- [ ] Bulk import/export
- [ ] Analytics dashboard
- [ ] Product recommendations
- [ ] Inventory forecasting
- [ ] Multi-language support
- [ ] A/B testing dashboard

## Troubleshooting

### Common Issues

**Image upload fails:**
- Check Cloudinary credentials in .env
- Verify file size is under 5MB
- Check CORS configuration

**API connection errors:**
- Verify backend server is running
- Check REACT_APP_API_URL in .env
- Review CORS settings

**Authentication issues:**
- Ensure JWT_SECRET matches
- Check token expiration
- Verify admin role in token payload

## Support & Maintenance

For issues or feature requests, please create an issue in the repository.

## License

This project is part of MPSS (My Profile Sourcing Solutions).
