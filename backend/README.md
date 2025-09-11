# MPSS E-commerce Backend

A robust Node.js/Express backend API for the MPSS E-commerce website with authentication, product management, order processing, and customization features.

## 🏗️ Architecture

### Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Express-validator
- **Security**: Helmet, CORS, Rate limiting
- **File Upload**: Multer

### Project Structure
```
backend/
├── models/           # Database models (User, Product, Order)
├── routes/           # API route handlers
├── middleware/       # Custom middleware (auth, validation)
├── server.js         # Main server file
├── config.env        # Environment configuration
├── package.json      # Dependencies and scripts
└── README.md         # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Set up environment variables:**
   - Copy `config.env` and modify as needed
   - Update MongoDB connection string
   - Set JWT secret key

3. **Start the server:**
   ```bash
   # Development mode (with auto-restart)
   npm run dev
   
   # Production mode
   npm start
   ```

4. **Verify the server is running:**
   - Health check: `GET http://localhost:5000/api/health`
   - Should return: `{"status":"OK","message":"MPSS Backend is running"}`

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Profile
```http
GET /api/auth/me
Authorization: Bearer <jwt_token>
```

### Product Endpoints

#### Get All Products
```http
GET /api/products?page=1&limit=12&category=T-Shirts&search=blue&minPrice=10&maxPrice=50&sort=-price
```

#### Get Single Product
```http
GET /api/products/:id
```

#### Create Product (Admin)
```http
POST /api/products
Authorization: Bearer <admin_jwt_token>
Content-Type: application/json

{
  "name": "Classic T-Shirt",
  "description": "Comfortable cotton t-shirt",
  "price": 25.99,
  "category": "T-Shirts",
  "stock": 100
}
```

### Order Endpoints

#### Create Order
```http
POST /api/orders
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "items": [
    {
      "product": "product_id",
      "quantity": 2,
      "price": 25.99
    }
  ],
  "paymentMethod": "credit_card",
  "shippingAddress": {
    "name": "John Doe",
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA",
    "phone": "+1234567890"
  }
}
```

#### Get User Orders
```http
GET /api/orders?page=1&limit=10&status=pending
Authorization: Bearer <jwt_token>
```

### Customization Endpoints

#### Calculate Custom Product Price
```http
POST /api/customization/calculate-price
Content-Type: application/json

{
  "outfitType": "T-Shirt",
  "quantity": 5,
  "customText": "MPSS",
  "selectedColor": "blue"
}
```

#### Save Custom Design
```http
POST /api/customization/save-design
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "outfitType": "T-Shirt",
  "selectedColor": "blue",
  "customText": "MPSS",
  "textPlacement": "Chest",
  "designName": "My Custom T-Shirt"
}
```

#### Create Custom Order
```http
POST /api/customization/order
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "outfitType": "T-Shirt",
  "selectedColor": "blue",
  "quantity": 5,
  "customText": "MPSS",
  "textPlacement": "Chest",
  "shippingAddress": {
    "name": "John Doe",
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA",
    "phone": "+1234567890"
  },
  "paymentMethod": "credit_card"
}
```

## 🔐 Authentication & Authorization

### JWT Token Structure
- **Header**: `Authorization: Bearer <token>`
- **Token Expiry**: 7 days (configurable)
- **User Roles**: `user`, `admin`

### Protected Routes
- Most routes require authentication via JWT token
- Admin routes require both authentication and admin role
- Public routes: product listing, health check, customization options

### Middleware
- `protect`: Verifies JWT token and adds user to request
- `admin`: Checks if user has admin role
- `optionalAuth`: Adds user to request if token exists (doesn't fail if missing)

## 🗄️ Database Models

### User Model
- Basic info: name, email, password
- Profile: phone, address, avatar
- Preferences: wishlist, role
- Security: password hashing, account status

### Product Model
- Product details: name, description, price, category
- Inventory: stock, SKU, availability
- Customization: colors, sizes, customization options
- Reviews: ratings, comments, average rating calculation
- SEO: meta tags, search indexing

### Order Model
- Order details: items, totals, status
- Customer info: shipping/billing addresses
- Payment: method, status, tracking
- Customization: custom product specifications

## 🔧 Configuration

### Environment Variables (`config.env`)
```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/mpss_ecommerce

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 🛡️ Security Features

### Built-in Security
- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: Prevent abuse
- **Input Validation**: Express-validator
- **Password Hashing**: bcryptjs
- **JWT**: Secure authentication

### Best Practices
- Environment variables for sensitive data
- Input sanitization and validation
- Error handling without exposing internals
- HTTPS in production
- Regular dependency updates

## 📊 Error Handling

### Standard Error Response Format
```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email"
    }
  ]
}
```

### HTTP Status Codes
- `200`: Success
- `201`: Created
- `400`: Bad Request (validation errors)
- `401`: Unauthorized (authentication required)
- `403`: Forbidden (insufficient permissions)
- `404`: Not Found
- `500`: Internal Server Error

## 🧪 Testing

### Manual Testing
1. Use Postman or similar tool
2. Test all endpoints with valid/invalid data
3. Verify authentication and authorization
4. Check error handling

### Example Test Flow
1. Register a new user
2. Login and get JWT token
3. Create a product (admin)
4. Browse products
5. Create an order
6. Test customization features

## 🚀 Deployment

### Production Checklist
- [ ] Set `NODE_ENV=production`
- [ ] Use strong JWT secret
- [ ] Configure MongoDB Atlas or production database
- [ ] Set up HTTPS
- [ ] Configure CORS origins
- [ ] Set up logging
- [ ] Configure backup strategy
- [ ] Set up monitoring

### Environment Setup
```bash
# Install PM2 for process management
npm install -g pm2

# Start in production
pm2 start server.js --name "mpss-backend"

# Monitor
pm2 monit

# Logs
pm2 logs mpss-backend
```

## 🔄 Integration with Frontend

### CORS Configuration
The backend is configured to accept requests from:
- Development: `http://localhost:5173` (Vite)
- Production: Your domain

### API Base URL
Frontend should use: `http://localhost:5000/api` (development)

### Example Frontend Integration
```javascript
// API service
const API_BASE = 'http://localhost:5000/api';

// Login
const login = async (email, password) => {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return response.json();
};

// Get products
const getProducts = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const response = await fetch(`${API_BASE}/products?${queryString}`);
  return response.json();
};
```

## 📝 Development Notes

### Adding New Features
1. Create model in `models/` directory
2. Add routes in `routes/` directory
3. Update `server.js` to include new routes
4. Add validation using express-validator
5. Test thoroughly

### Database Operations
- Use Mongoose for all database operations
- Implement proper error handling
- Use transactions for complex operations
- Index frequently queried fields

### Performance Optimization
- Implement pagination for large datasets
- Use database indexing
- Implement caching where appropriate
- Optimize database queries

## 🤝 Contributing

1. Follow the existing code structure
2. Add proper error handling
3. Include input validation
4. Write clear commit messages
5. Test your changes thoroughly

## 📞 Support

For questions or issues:
1. Check the API documentation
2. Review error logs
3. Test with Postman
4. Check MongoDB connection
5. Verify environment variables

---

**Happy Coding! 🎉** 