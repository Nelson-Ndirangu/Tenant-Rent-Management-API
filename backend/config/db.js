// Database configuration file
const mongoose = require('mongoose');
require('dotenv').config();
const logger = require('../logger/logger')


// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        logger.info('MongoDB connected successfully');
    } catch (error) {
        logger.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;