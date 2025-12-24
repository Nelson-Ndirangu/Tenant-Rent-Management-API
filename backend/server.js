// Backend server entry point
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoute');
const landlordRoutes = require('./routes/landlordRoute');
const propertyRoutes = require('./routes/propertyRoute');
const tenantRoutes = require('./routes/tenantRoute');
const userRoutes = require('./routes/userRoute');
const notificationRoutes = require('./routes/notificationRoute');
require('./cron/reminder');
const app = express();



// Middleware to parse JSON requests
app.use(express.json());

// Connect to the database
connectDB();

// Define a simple route
app.get('/', (req, res) => {
    res.send('Welcome to the Tenant Rent Management API');
});


// API Endpoints
app.use('/api/auth', authRoutes);
app.use('/api/admin/landlord', landlordRoutes);
app.use('/api/admin/property', propertyRoutes);
app.use('/api/tenant', tenantRoutes);
app.use('/api/admin/user', userRoutes);
app.use('/api/notifications', notificationRoutes);

// Start the server 
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});