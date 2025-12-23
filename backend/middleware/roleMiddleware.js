// Role middleware to check user roles
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Middleware function
const roleMiddleware = (requiredRoles) => {
    return async (req, res, next) => {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.userId).select('-password');
            if (!user || !requiredRoles.includes(user.role)) {
                return res.status(403).json({ message: 'Access denied...' });
            }
            req.user = user;
            next();
        } catch (error) {
            res.status(401).json({ message: 'Token is not valid' });
        }
    };
};

module.exports = roleMiddleware;