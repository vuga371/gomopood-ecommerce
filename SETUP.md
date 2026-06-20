# GOMOPOOD Full Stack Setup Guide

## Prerequisites

- Node.js 16+
- PostgreSQL 12+
- npm or yarn

## Project Structure

```
gomopood-ecommerce/
├── frontend/          # React Application
├── backend/           # Node.js/Express API
├── database/          # PostgreSQL Schema
├── docker/            # Docker Configuration
├── docs/              # Documentation
└── README.md
```

## Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/vuga371/gomopood-ecommerce.git
cd gomopood-ecommerce
```

### 2. Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your database credentials
# DB_HOST=localhost
# DB_USER=postgres
# DB_PASSWORD=your_password
# DB_NAME=gomopood

# Start backend
npm run dev
```

Backend runs at: `http://localhost:5000`

### 3. Setup Database

```bash
# Create database
createdb gomopood

# Apply schema
psql gomopood < ../database/schema.sql

# Seed sample data (optional)
psql gomopood < ../database/seeds/sample_data.sql
```

### 4. Setup Frontend

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:5000/api" > .env

# Start development server
npm run dev
```

Frontend runs at: `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/categories` - Get categories

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add to cart
- `DELETE /api/cart/remove/:itemId` - Remove from cart
- `PUT /api/cart/update/:itemId` - Update cart item

### Orders
- `GET /api/orders` - Get user orders
- `GET /api/orders/:orderId` - Get order details
- `POST /api/orders` - Create order

## Frontend Features

- ✅ Responsive Design
- ✅ Product Filtering & Search
- ✅ Shopping Cart
- ✅ Checkout Process
- ✅ User Authentication
- ✅ Order Management
- ✅ Dashboard
- ✅ Contact Form

## Backend Features

- ✅ REST API
- ✅ JWT Authentication
- ✅ PostgreSQL Database
- ✅ Input Validation
- ✅ Error Handling
- ✅ CORS Support
- ✅ Rate Limiting

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

### Backend (.env)
```
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=gomopood
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
```

## Build for Production

### Frontend
```bash
cd frontend
npm run build
npm run preview
```

### Backend
```bash
cd backend
npm install --production
NODE_ENV=production npm start
```

## Docker Deployment

```bash
cd docker
docker-compose up -d
```

## Testing

```bash
# Frontend
cd frontend
npm run lint

# Backend
cd backend
npm run test
```

## Troubleshooting

### Backend won't start
- Check if PostgreSQL is running
- Verify database credentials in .env
- Check if port 5000 is available

### Frontend can't connect to backend
- Verify backend is running on port 5000
- Check VITE_API_URL in .env
- Check browser console for CORS errors

### Database errors
- Ensure PostgreSQL is installed and running
- Create database: `createdb gomopood`
- Run migrations: `psql gomopood < database/schema.sql`

## Support

- 📧 Email: gomopood@gmail.com
- 📱 WhatsApp: +256 790197459
- 📞 Phone: +211925933840

## License

Proprietary - GOMOPOOD

---

**Happy coding! 🚀**
