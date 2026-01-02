# Tenant Rent Management API

A comprehensive REST API for managing tenant rent payments, properties, and user roles in a rental property management system. Built with Node.js, Express, and MongoDB, featuring M-Pesa STK push integration for payments in Kenya.

## Features

- **User Authentication & Authorization**: JWT-based authentication with role-based access control (Admin, Landlord, Tenant)
- **Property Management**: CRUD operations for properties with landlord association
- **Tenant Management**: Link tenants to properties and units with lease management
- **Payment Integration**: M-Pesa STK Push for rent payments
- **Notifications**: Email notifications for rent reminders and updates
- **Automated Reminders**: Cron jobs for rents due reminders
- **Secure API**: Password hashing, CORS support, middleware protection, and rate limiting

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Payments**: M-Pesa Daraja API
- **Email**: Nodemailer with Gmail SMTP
- **Scheduling**: Node-cron for automated tasks
- **Security**: bcryptjs for password hashing, CORS, express-rate-limit for rate limiting

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

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login

### Properties (Admin only)

- `POST /api/admin/property` - Create a property
- `GET /api/admin/property` - Get all properties
- `GET /api/admin/property/:id` - Get property by ID
- `PUT /api/admin/property/:id` - Update property
- `DELETE /api/admin/property/:id` - Delete property

### Tenants (Admin & Landlord)

- `POST /api/tenant` - Create a tenant
- `GET /api/tenant` - Get all tenants
- `GET /api/tenant/:id` - Get tenant by ID
- `PUT /api/tenant/:id` - Update tenant
- `DELETE /api/tenant/:id` - Delete tenant

### Users (Admin only)

- `GET /api/admin/user` - Get all users
- `GET /api/admin/user/:id` - Get user by ID
- `PUT /api/admin/user/:id` - Update user
- `DELETE /api/admin/user/:id` - Delete user

### Landlords (Admin only)

- `GET /api/admin/landlord` - Get all landlords
- `GET /api/admin/landlord/:id` - Get landlord by ID
- `PUT /api/admin/landlord/:id` - Update landlord
- `DELETE /api/admin/landlord/:id` - Delete landlord

### Notifications

- `GET /api/notifications` - Get user notifications
- `PUT /api/notifications/:id/read` - Mark notification as read

### M-Pesa Payments

- `POST /api/mpesa/stk-push` - Initiate STK Push payment
- `POST /api/mpesa/callback` - M-Pesa callback handler

## User Roles

- **Admin**: Full access to all endpoints, manage users, properties, tenants
- **Landlord**: Manage tenants and view properties
- **Tenant**: Limited access, view own information

## Database Models

### User

- name: String
- email: String (unique)
- phoneNumber: String (unique)
- password: String (hashed)
- role: Enum ['landlord', 'tenant', 'admin']
- createdAt: Date

### Property

- landlordId: ObjectId (ref: User)
- propertyName: String
- location: String
- county: String

### Tenant

- userId: ObjectId (ref: User)
- propertyId: ObjectId (ref: Property)
- unitId: ObjectId (ref: Unit)
- leaseStartDate: Date
- leaseEndDate: Date
- status: Enum ['active', 'inactive', 'pending']

### Payment

- tenantId: ObjectId (ref: Tenant)
- amount: Number
- mpesaReceiptNumber: String
- transactionDate: Date
- status: String

### Notification

- userId: ObjectId (ref: User)
- message: String
- type: String
- isRead: Boolean
- createdAt: Date

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

### Running Tests

```bash
npm test
```

### Code Linting

```bash
npm run lint
```

### API Documentation

The API uses RESTful conventions. All requests should include:

- `Content-Type: application/json` for POST/PUT requests
- `Authorization: Bearer <token>` header for authenticated routes

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

## Support

For support, email nelsonmaina690@gmail.com or create an issue in the repository.

## Acknowledgments

- M-Pesa Daraja API for payment integration
- MongoDB for database management
- Express.js community for middleware and tools
