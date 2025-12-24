// Notification Route for landlord and tenant notifications
const express = require('express');
const router = express.Router();
const { getAllNotifications, deleteNotification } = require('../controllers/notificationController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Get all notifications (accessible by admin, landlord, tenant)
router.get('/', authMiddleware, roleMiddleware(['admin', 'landlord', 'tenant']), getAllNotifications);
// Delete notification by ID (accessible by admin, landlord, tenant)
router.delete('/:id', authMiddleware, roleMiddleware(['admin', 'landlord', 'tenant']), deleteNotification);

module.exports = router;