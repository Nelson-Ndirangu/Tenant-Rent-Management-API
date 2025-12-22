// Backend server entry point
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./config/db');
const app = express();


// Middleware to parse JSON requests
app.use(express.json());

// Connect to the database
connectDB();

// Define a simple route
app.get('/', (req, res) => {
    res.send('Welcome to the Tenant Rent Management API');
});

// Start the server 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});