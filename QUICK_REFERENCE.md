# Product Management System - Quick Reference

## File Locations

```
Frontend Components:
├── src/components/ProductDetail.tsx          ← Customer product page
├── src/components/AdminProductManager.tsx    ← Admin dashboard
├── src/services/productService.ts            ← API calls
└── src/examples/ProductManagementExamples.tsx ← Usage examples

Backend:
├── backend/controllers/productController.js  ← Business logic
├── backend/models/Product.js                 ← Database schema
├── backend/routes/products.js                ← API routes
└── backend/config/cloudinary.js              ← Image setup

Documentation:
├── PRODUCT_MANAGEMENT_DOCS.md                ← Full documentation
├── ENV_SETUP_GUIDE.md                        ← Environment setup
└── INTEGRATION_GUIDE.md                      ← Integration steps
```

## Common Tasks

### View All Products
```typescript
const products = await productService.getAllProducts()
```

### Get Single Product
```typescript
const product = await productService.getProduct('product-id')
```

### Add New Product (Admin)
```typescript
await productService.createProduct({
  name: 'Product Name',
  price: 499,
  stock: 100,
  category: 'shirts'
}, token)
```

### Update Product Stock (Admin)
```typescript
await productService.updateStock('product-id', -5, token)
```

### Upload Product Image (Admin)
```typescript
await productService.uploadProductImage(
  'product-id',
  imageFile,
  'Image description',
  token
)
```

### Delete Product (Admin)
```typescript
await productService.deleteProduct('product-id', token)
```

## API Endpoints

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| GET | `/api/products` | - | Get all products |
| GET | `/api/products/:id` | - | Get single product |
| GET | `/api/products/featured` | - | Get featured |
| POST | `/api/products` | ✓ | Create product |
| PUT | `/api/products/:id` | ✓ | Update product |
| DELETE | `/api/products/:id` | ✓ | Delete product |
| PATCH | `/api/products/:id/stock` | ✓ | Update stock |
| GET | `/api/products/stock/low` | ✓ | Low stock alert |
| POST | `/api/products/:id/upload-image` | ✓ | Upload image |
| DELETE | `/api/products/:id/images/:imageId` | ✓ | Delete image |
| POST | `/api/products/:id/reviews` | ✓ | Add review |

## Environment Variables

```env
# Backend (.env)
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mpss_products
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Frontend (.env)
REACT_APP_API_URL=http://localhost:5000/api
```

## Component Props

### ProductDetail
```typescript
interface ProductDetailProps {
  id: number
  name: string
  description: string
  price: number
  originalPrice: number
  rating: number
  reviews: number
  images: ProductImage[]
  colors: string[]
  sizes: string[]
  sku: string
  stock: number
  category: string
  badge?: string
  isWishlisted?: boolean
  onWishlistToggle?: () => void
}
```

### AdminProductManager
```typescript
interface AdminProductManagerProps {
  onProductSave: (product: ProductFormData) => void
  onProductDelete: (productId: number) => void
  products: any[]
}
```

## Database Fields

### Product Schema
```javascript
{
  name: String,              // Product name
  description: String,       // Full description
  sku: String,              // Unique identifier
  category: String,         // Category name
  price: Number,            // Current price
  originalPrice: Number,    // Original price
  stock: Number,            // Stock quantity
  colors: [String],         // Available colors
  sizes: [String],          // Available sizes
  images: [{
    url: String,
    alt: String,
    cloudinaryId: String
  }],
  badge: String,            // Featured label
  rating: Number,           // Average rating
  reviews: Number,          // Review count
  isFeatured: Boolean,      // Featured flag
  isTrending: Boolean,      // Trending flag
  isNewArrival: Boolean,    // New flag
  isAvailable: Boolean,     // Stock status
  tags: [String],           // Search tags
  createdAt: Date,          // Creation date
  updatedAt: Date           // Update date
}
```

## Common Errors & Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| `401 Unauthorized` | Missing/invalid token | Check JWT in headers |
| `403 Forbidden` | Not admin user | Verify user role in token |
| `404 Not Found` | Product doesn't exist | Check product ID |
| `Cloudinary upload fails` | Invalid credentials | Verify .env variables |
| `CORS error` | Frontend/backend mismatch | Check CORS configuration |
| `Database connection failed` | MongoDB offline | Start MongoDB service |

## Testing with Postman

### Create Product
```
POST http://localhost:5000/api/products
Headers:
  Authorization: Bearer {token}
  Content-Type: application/json

Body:
{
  "name": "Test Product",
  "description": "Test description",
  "sku": "TEST-001",
  "category": "shirts",
  "price": 499,
  "stock": 100,
  "colors": ["Black", "White"],
  "sizes": ["M", "L", "XL"]
}
```

### Get Products
```
GET http://localhost:5000/api/products?category=shirts&sort=price-low
```

### Upload Image
```
POST http://localhost:5000/api/products/{productId}/upload-image
Headers:
  Authorization: Bearer {token}

Form-data:
  image: (select file)
  alt: Product image
```

## Performance Tips

1. **Use lazy loading** for images
2. **Enable Cloudinary caching** for CDN
3. **Index MongoDB fields** for faster queries
4. **Implement pagination** for large lists
5. **Cache API responses** in frontend
6. **Compress images** before upload
7. **Use debouncing** for search
8. **Minimize API calls** with filtering

## Security Checklist

- ✓ JWT tokens validated on backend
- ✓ Admin routes protected
- ✓ Input validation on both sides
- ✓ File upload size limits
- ✓ CORS configured properly
- ✓ Environment variables not exposed
- ✓ Database credentials secured
- ✓ HTTPS enabled in production

## Useful Commands

```bash
# Backend
cd backend
npm install
npm start
npm run dev           # With auto-reload

# Frontend
npm start             # Development
npm run build         # Production build
npm test             # Run tests

# Database
mongod               # Start MongoDB
mongo                # Connect to MongoDB

# Environment
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
                    # Generate JWT secret
```

## File Upload Sizes

- Max file size: 5MB
- Max files per product: 5
- Supported formats: JPG, PNG, WebP, GIF

## Stock Status Colors

- **Green**: In Stock (>10 units)
- **Yellow**: Low Stock (1-10 units)
- **Red**: Out of Stock (0 units)

## Frontend Routes

```
/products                    # Product listing
/products/:id               # Product detail
/admin/products             # Admin dashboard
/admin/products/:id         # Edit product
/admin/products/new         # Create product
```

## Response Format

### Success Response
```json
{
  "success": true,
  "data": { /* product data */ },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": [ /* validation errors */ ]
}
```

## Authentication Header
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Pagination Example
```typescript
const products = await productService.getAllProducts({
  page: 1,
  limit: 20
})
```

## Sorting Options

| Sort | Behavior |
|------|----------|
| `price-low` | Low to high |
| `price-high` | High to low |
| `newest` | Most recent first |
| `rating` | Highest rated first |
| `featured` | Featured products |

## Cloudinary Image Transformations

```javascript
// Auto quality
https://res.cloudinary.com/.../quality_auto:good

// Responsive
https://res.cloudinary.com/.../responsive:true

// Crop to fill
https://res.cloudinary.com/.../c_fill/g_auto
```

## Rate Limiting (Recommended)

```
Default: 100 requests per 15 minutes per IP
Implement in production for API protection
```

## Backup & Recovery

```bash
# Backup MongoDB
mongodump --db mpss_products --out ./backup

# Restore MongoDB
mongorestore --db mpss_products ./backup/mpss_products
```

## Support Resources

- **MongoDB Docs**: https://docs.mongodb.com
- **Express Docs**: https://expressjs.com
- **React Docs**: https://react.dev
- **Cloudinary Docs**: https://cloudinary.com/documentation
- **Tailwind CSS**: https://tailwindcss.com/docs

## Troubleshooting

### Backend not starting?
```bash
# Check port is available
lsof -i :5000

# Check MongoDB
mongosh --eval "db.adminCommand('ping')"

# Check environment
cat .env
```

### Images not uploading?
```bash
# Verify Cloudinary credentials
echo $CLOUDINARY_CLOUD_NAME
echo $CLOUDINARY_API_KEY

# Check file size < 5MB
```

### CORS errors?
```bash
# Frontend URL must match backend CORS_ORIGIN
# Example: http://localhost:3000

# Update backend .env:
CORS_ORIGIN=http://localhost:3000,http://localhost:5173
```

---

**Last Updated**: May 2026
**Version**: 1.0.0
**Status**: Production Ready ✅
