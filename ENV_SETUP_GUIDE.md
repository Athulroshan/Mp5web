# Product Management System Environment Configuration

## Backend Environment Variables (.env)

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/mpss_products
# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mpss_products

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# Cloudinary Configuration (for image storage)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# CORS Configuration
CORS_ORIGIN=http://localhost:3000,http://localhost:5173

# File Upload Limits
MAX_FILE_SIZE=5242880  # 5MB in bytes
MAX_FILES=5

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100

# Email Configuration (optional, for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Logging
LOG_LEVEL=debug
```

## Frontend Environment Variables (.env)

```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api

# App Configuration
REACT_APP_ENV=development
REACT_APP_NAME=MPSS Product Management

# Feature Flags
REACT_APP_ENABLE_REVIEWS=true
REACT_APP_ENABLE_WISHLIST=true
REACT_APP_ENABLE_ADMIN_DASHBOARD=true

# Image Configuration
REACT_APP_IMAGE_OPTIMIZATION=true
REACT_APP_LAZY_LOAD_IMAGES=true
```

## Development vs Production

### Development Setup

```bash
# Install dependencies
npm install

# Run with nodemon for auto-restart
npm run dev

# Run with logging
DEBUG=mpss:* npm run dev
```

### Production Setup

```bash
# Build and start
npm run build
npm start

# Use PM2 for process management
pm2 start server.js --name "mpss-products"
```

## Database Initialization

### MongoDB Local Setup

```bash
# Start MongoDB service
mongod

# Connect to database
mongo mongodb://localhost:27017/mpss_products

# Create indexes
db.products.createIndex({ name: "text", description: "text" })
db.products.createIndex({ category: 1 })
db.products.createIndex({ sku: 1 }, { unique: true })
db.products.createIndex({ isFeatured: 1, isTrending: 1 })
```

### MongoDB Atlas Setup

1. Create cluster at https://www.mongodb.com/cloud/atlas
2. Get connection string
3. Update MONGODB_URI in .env
4. Connection string format:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/database_name?retryWrites=true&w=majority
   ```

## Cloudinary Setup

### Getting Credentials

1. Sign up at https://cloudinary.com
2. Go to Dashboard
3. Copy:
   - Cloud Name
   - API Key
   - API Secret
4. Store in .env

### Cloudinary Configuration

```javascript
// Example in code
const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// Upload with auto optimization
const result = await cloudinary.uploader.upload(file, {
  folder: 'mpss-products',
  quality: 'auto:good',
  responsive: true,
  gravity: 'auto',
  crop: 'fill'
})
```

## SSL/HTTPS Configuration

### For Production

```bash
# Generate self-signed certificate (development only)
openssl req -x509 -newkey rsa:4096 -nodes -out cert.pem -keyout key.pem -days 365

# Or use Let's Encrypt with Certbot
certbot certonly --standalone -d yourdomain.com
```

### Express HTTPS Setup

```javascript
const https = require('https')
const fs = require('fs')

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
}

https.createServer(options, app).listen(443, () => {
  console.log('Server running on https://localhost')
})
```

## Testing Environment

```env
# .env.test
NODE_ENV=test
MONGODB_URI=mongodb://localhost:27017/mpss_products_test
JWT_SECRET=test_secret_key

# Use test Cloudinary account or mock
CLOUDINARY_CLOUD_NAME=test
CLOUDINARY_API_KEY=test_key
CLOUDINARY_API_SECRET=test_secret
```

## Docker Configuration (Optional)

### Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

### Docker Compose

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:6
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_DATABASE: mpss_products
    volumes:
      - mongodb_data:/data/db

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      MONGODB_URI: mongodb://mongodb:27017/mpss_products
      JWT_SECRET: dev_secret
      CLOUDINARY_CLOUD_NAME: ${CLOUDINARY_CLOUD_NAME}
      CLOUDINARY_API_KEY: ${CLOUDINARY_API_KEY}
      CLOUDINARY_API_SECRET: ${CLOUDINARY_API_SECRET}
    depends_on:
      - mongodb

  frontend:
    build: ./
    ports:
      - "3000:3000"
    environment:
      REACT_APP_API_URL: http://localhost:5000/api

volumes:
  mongodb_data:
```

### Run with Docker

```bash
docker-compose up --build
```

## Environment Validation

Create a validation script to check required environment variables:

```javascript
// backend/config/validateEnv.js
const required = [
  'MONGODB_URI',
  'JWT_SECRET',
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET'
]

required.forEach(key => {
  if (!process.env[key]) {
    console.error(`Missing required environment variable: ${key}`)
    process.exit(1)
  }
})

console.log('✓ All required environment variables are set')
```

## Security Best Practices

1. **Never commit .env files** - Add to .gitignore
2. **Use strong JWT_SECRET** - Generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
3. **Enable HTTPS** in production
4. **Use environment variables** for all sensitive data
5. **Rotate credentials** regularly
6. **Keep dependencies updated** - `npm audit`

## Monitoring & Logging

### Recommended Tools

- PM2 for process management
- Morgan for HTTP logging
- Winston for application logging
- Sentry for error tracking

### Setup Example

```javascript
const winston = require('winston')

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }))
}
```
