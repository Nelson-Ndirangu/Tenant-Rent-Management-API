// Backend server entry point
const express = require('express');
const dotenv = require('dotenv');
const http = require('http');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

dotenv.config();

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoute');
const landlordRoutes = require('./routes/landlordRoute');
const propertyRoutes = require('./routes/propertyRoute');
const tenantRoutes = require('./routes/tenantRoute');
const userRoutes = require('./routes/userRoute');
const mpesaRoutes = require('./routes/mpesaRoute');
const notificationRoutes = require('./routes/notificationRoute');

require('./cron/reminder');

const app = express();

// Rate Limiter
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per window
    message: {
        status: 429,
        error: 'Too many requests, please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false
});

// Apply rate limiter to all requests
app.use(globalLimiter);

// Middleware
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.urlencoded({ extended: true }));


// Connect to Database
connectDB();

// Endpoints
app.get('/', (req, res) => {
    res.send('Welcome to the Tenant Rent Management API');
});

app.use('/api/auth', authRoutes);
app.use('/api/admin/landlord', landlordRoutes);
app.use('/api/admin/property', propertyRoutes);
app.use('/api/tenant', tenantRoutes);
app.use('/api/admin/user', userRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/mpesa', mpesaRoutes);

const PORT = process.env.PORT || 6000;

// HTTP server
const server = http.createServer(app);

// Server timeout settings
server.timeout = 30 * 1000; // 30 seconds
server.keepAliveTimeout = 65 * 1000; // keep-alive timeout
server.headersTimeout = 70 * 1000; // headers timeout

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
