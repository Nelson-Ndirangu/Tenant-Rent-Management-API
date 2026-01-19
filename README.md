# Tenant Rent Management API

A comprehensive REST API for managing tenant rent payments, properties, and user roles in a rental property management system. Built with Node.js, Express, and MongoDB, featuring M-Pesa STK push integration for payments in Kenya.

## Features

- **User Authentication & Authorization**: JWT-based authentication with role-based access control (Admin, Landlord, Tenant)
- **Property Management**: CRUD operations for properties with landlord association and unit management
- **Tenant Management**: Link tenants to properties and units with lease management
- **Payment Integration**: M-Pesa STK Push for rent payments with callback handling
- **Notifications**: In-app and email notifications for rent reminders and updates
- **Automated Reminders**: Cron jobs for rents due reminders with scheduled tasks
- **Secure API**: Password hashing (bcryptjs), CORS support, JWT middleware protection, and rate limiting
- **Logging & Monitoring**: Winston logger for error tracking and request logging with Morgan
- **API Documentation**: Comprehensive REST API endpoints with role-based access control

## Tech Stack

- **Backend**: Node.js, Express.js (v5.2.1)
- **Database**: MongoDB with Mongoose ODM (v9.0.2)
- **Authentication**: JSON Web Tokens (JWT) for secure API access
- **Payments**: M-Pesa Daraja API with STK Push integration
- **Email**: Nodemailer (v7.0.12) with Gmail SMTP
- **Scheduling**: Node-cron (v4.2.1) for automated rent reminder tasks
- **Security**: bcryptjs (v3.0.3) for password hashing, CORS for cross-origin requests, express-rate-limit for API rate limiting
- **Logging**: Winston (v3.19.0) for error tracking, Morgan for HTTP request logging
- **Code Quality**: ESLint (v9.39.2) for code linting and formatting
- **HTTP Client**: Axios for M-Pesa API requests

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Gmail account for email notifications
- M-Pesa Developer Account (for payment integration)

## Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd tenant-rent-management-api
   ```

2. **Install dependencies**:

   ```bash
   cd backend
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the `backend` directory with the following variables:

   ```env
   MONGO_URI=mongodb://localhost:27017/tenant_rent_management
   PORT=6000
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   EMAIL_SERVICE=gmail
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   CONSUMER_KEY=your_mpesa_consumer_key
   CONSUMER_SECRET=your_mpesa_consumer_secret
   BUSINESS_SHORT_CODE=174379
   PASS_KEY=your_mpesa_passkey
   CALLBACK_URL=https://your-ngrok-url/api/mpesa/callback
   ```

4. **Start MongoDB**:
   Ensure MongoDB is running on your system.

5. **Run the application**:
   ```bash
   npm run dev  # For development with nodemon
   # or
   npm start    # For production
   ```

The server will start on `http://localhost:6000`.

## API Endpoints

### Root

- `GET /` - Welcome message

### Authentication

- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - User login with JWT token generation

### Properties (Admin only)

- `POST /api/v1/admin/property` - Create a new property
- `GET /api/v1/admin/property` - Get all properties
- `GET /api/v1/admin/property/:id` - Get property by ID
- `PUT /api/v1/admin/property/:id` - Update property details
- `DELETE /api/v1/admin/property/:id` - Delete property

### Tenants (Admin & Landlord)

- `POST /api/v1/tenant` - Create a new tenant
- `GET /api/v1/tenant` - Get all tenants
- `GET /api/v1/tenant/:id` - Get tenant by ID
- `PUT /api/v1/tenant/:id` - Update tenant information
- `DELETE /api/v1/tenant/:id` - Delete tenant

### Users (Admin only)

- `POST /api/v1/admin/user` - Create a new user
- `GET /api/v1/admin/user` - Get all users
- `GET /api/v1/admin/user/:id` - Get user by ID
- `PUT /api/v1/admin/user/:id` - Update user details
- `DELETE /api/v1/admin/user/:id` - Delete user

### Landlords (Admin only)

- `POST /api/v1/admin/landlord` - Create a new landlord
- `GET /api/v1/admin/landlord` - Get all landlords
- `GET /api/v1/admin/landlord/:id` - Get landlord by ID
- `PUT /api/v1/admin/landlord/:id` - Update landlord details
- `DELETE /api/v1/admin/landlord/:id` - Delete landlord

### Notifications (Admin, Landlord, Tenant)

- `GET /api/v1/notifications` - Retrieve all user notifications
- `DELETE /api/v1/notifications/:id` - Delete a specific notification

### M-Pesa Payments

- `POST /mpesa/stk-push` - Initiate STK Push payment request
- `POST /mpesa/callback` - M-Pesa callback handler for payment confirmation

## Middleware & Security

### Authentication Middleware
- Verifies JWT tokens from Authorization header
- Extracts user information and attaches to request object
- Returns 401 Unauthorized if token is missing or invalid

### Role-Based Access Control (RBAC)
- Restricts endpoints based on user roles: Admin, Landlord, Tenant
- Checks user role against required roles for each endpoint
- Returns 403 Forbidden if user lacks required permissions

### Rate Limiting
- Global rate limiter: 100 requests per IP per 15 minutes
- Returns 429 Too Many Requests when limit exceeded
- Prevents API abuse and DDoS attacks

### CORS Configuration
- Allows requests from all origins
- Permitted methods: GET, POST, PUT, DELETE
- Allowed headers: Content-Type, Authorization

## Logging & Monitoring

### Winston Logger
- Console logging for all environments
- File logging for errors: `logs/error.log`
- Combined logging: `logs/combined.log`
- Timestamp format: YYYY-MM-DD HH:mm:ss
- Environment-based log levels: Debug (development), Info (production)

### Request Logging
- Morgan middleware logs all HTTP requests
- Combined log format
- Integrated with Winston for centralized logging

## User Roles

- **Admin**: Full access to all endpoints, manage users, properties, tenants
- **Landlord**: Manage tenants and view properties
- **Tenant**: Limited access, view own information

## Database Models

### User Model
```
{
  name: String,
  email: String (unique),
  phoneNumber: String (unique),
  password: String (hashed with bcryptjs),
  role: Enum ['landlord', 'tenant', 'admin'],
  createdAt: Date
}
```

### Property Model
```
{
  landlordId: ObjectId (ref: User),
  propertyName: String,
  location: String,
  county: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Unit Model
```
{
  propertyId: ObjectId (ref: Property),
  unitNumber: String,
  unitType: Enum ['studio', '1-bedroom', '2-bedroom', '3-bedroom', '4-bedroom', '5-bedroom', 'business-suite', 'office-space', 'retail-space', 'warehouse', 'own-compound'],
  rentAmount: Number,
  dueDate: Number (day of month),
  isOccupied: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Tenant Model
```
{
  userId: ObjectId (ref: User),
  propertyId: ObjectId (ref: Property),
  unitId: ObjectId (ref: Unit),
  leaseStartDate: Date,
  leaseEndDate: Date,
  status: Enum ['active', 'inactive', 'pending'],
  createdAt: Date,
  updatedAt: Date
}
```

### Payment Model
```
{
  tenantId: ObjectId (ref: Tenant),
  amount: Number,
  mpesaReceiptNumber: String,
  transactionDate: Date,
  status: String ['pending', 'completed', 'failed'],
  createdAt: Date
}
```

### Notification Model
```
{
  userId: ObjectId (ref: User),
  tenantId: ObjectId (ref: Tenant),
  message: String,
  type: String ['rent_reminder', 'payment_confirmation', 'payment_failed'],
  isRead: Boolean (default: false),
  createdAt: Date
}
```

## Environment Variables

| Variable            | Description                                   | Required |
| ------------------- | --------------------------------------------- | -------- |
| MONGO_URI           | MongoDB connection string                     | Yes      |
| PORT                | Server port (default: 6000)                   | No       |
| JWT_SECRET          | Secret key for JWT tokens                     | Yes      |
| EMAIL_USER          | Gmail address for notifications               | Yes      |
| EMAIL_PASS          | Gmail app password                            | Yes      |
| CONSUMER_KEY        | M-Pesa API consumer key                       | Yes      |
| CONSUMER_SECRET     | M-Pesa API consumer secret                    | Yes      |
| BUSINESS_SHORT_CODE | M-Pesa business short code                    | Yes      |
| PASS_KEY            | M-Pesa passkey                                | Yes      |
| CALLBACK_URL        | M-Pesa callback URL (use ngrok for local dev) | Yes      |

## Development

### Running the Application

```bash
npm run dev  # For development with nodemon
# or
npm start    # For production
```

The API uses RESTful conventions. All requests should include:

- `Content-Type: application/json` for POST/PUT requests
- `Authorization: Bearer <token>` header for authenticated routes

## Project Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB connection configuration
├── controllers/              # Request handlers for each resource
│   ├── authController.js     # Authentication logic (register, login)
│   ├── landlordController.js # Landlord CRUD operations
│   ├── notificationController.js  # Notification management
│   ├── propertyController.js # Property CRUD operations
│   ├── tenantController.js   # Tenant CRUD operations
│   └── userController.js     # User management
├── cron/
│   ├── reminder.js           # Automated rent reminder jobs
│   └── test.js               # Test cron tasks
├── logger/
│   └── logger.js             # Winston logger configuration
├── middleware/
│   ├── authMiddleware.js     # JWT token verification
│   └── roleMiddleware.js     # Role-based access control
├── models/                   # Mongoose schemas
│   ├── notification.js
│   ├── payment.js
│   ├── property.js
│   ├── tenant.js
│   ├── unit.js
│   └── user.js
├── mpesa/                    # M-Pesa integration
│   ├── mpesa.controller.js   # M-Pesa callback handler
│   ├── mpesa.routes.js       # M-Pesa API routes
│   ├── mpesa.service.js      # M-Pesa business logic
│   └── mpesa.utils.js        # M-Pesa utility functions
├── routes/                   # API route definitions
│   ├── authRoute.js
│   ├── landlordRoute.js
│   ├── notificationRoute.js
│   ├── propertyRoute.js
│   ├── tenantRoute.js
│   └── userRoute.js
├── services/
│   └── notification.js       # Notification service
├── logs/                     # Log files directory
├── server.js                 # Express server entry point
└── package.json              # Project dependencies
```

## Cron Jobs

### Rent Reminder Job
- Automatically sends notifications to tenants with overdue rent
- Scheduled using node-cron for regular intervals
- Sends email notifications via Nodemailer
- Configured in: `backend/cron/reminder.js`

## M-Pesa Integration

### STK Push Flow
1. Client initiates payment request with tenant ID and amount
2. M-Pesa API sends STK prompt to customer's phone
3. Customer enters M-Pesa PIN to complete payment
4. M-Pesa sends callback with transaction result
5. System updates payment status and sends confirmation notification

### Configuration Required
- Consumer Key and Consumer Secret from M-Pesa Daraja
- Business Short Code (provided by M-Pesa)
- Pass Key for STK Push encryption
- Callback URL (use ngrok for local development)

## Deployment

1. Set `NODE_ENV=production` in environment variables
2. Use a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start server.js --name "tenant-api"
   ```
3. Set up a reverse proxy with Nginx
4. Configure SSL certificate
5. Set up MongoDB replica set for production

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## API Usage Examples

### Register a New User
```bash
curl -X POST http://localhost:6000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phoneNumber": "254712345678",
    "password": "SecurePassword123",
    "role": "tenant"
  }'
```

### Login
```bash
curl -X POST http://localhost:6000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePassword123"
  }'
```

### Get Notifications
```bash
curl -X GET http://localhost:6000/api/v1/notifications \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

### Initiate M-Pesa Payment
```bash
curl -X POST http://localhost:6000/mpesa/stk-push \
  -H "Content-Type: application/json" \
  -d '{
    "tenantId": "63f7d1a1b2c3d4e5f6g7h8i9",
    "amount": 5000,
    "phoneNumber": "254712345678"
  }'
```

## Error Handling

### Standard Error Responses

#### 400 Bad Request
```json
{
  "status": 400,
  "message": "Invalid input data"
}
```

#### 401 Unauthorized
```json
{
  "message": "No token, authorization denied"
}
```

#### 403 Forbidden
```json
{
  "message": "Access denied..."
}
```

#### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

#### 429 Too Many Requests
```json
{
  "status": 429,
  "error": "Too many requests, please try again later."
}
```

#### 500 Internal Server Error
```json
{
  "status": 500,
  "message": "Internal server error"
}
```

## Copyright

© 2026 Tenant Rent Management API. All rights reserved.

This project is copyrighted material. Unauthorized duplication, distribution, or use may result in legal actions.

## Support

For support, email nelsonmaina690@gmail.com or create an issue in the repository.

## Acknowledgments

- M-Pesa Daraja API for payment integration
- MongoDB for database management
- Express.js community for middleware and tools
