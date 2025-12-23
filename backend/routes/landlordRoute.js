// Landlord routes
const express = require('express');
const router = express.Router();
const userController = require('../controllers/landlordController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Routes
router.post(
    '/',
    authMiddleware,
    roleMiddleware(['admin']),
    userController.createUser
);

router.get(
    '/',
    authMiddleware,
    roleMiddleware(['admin']),
    userController.getAllUsers
);

router.get(
    '/:id',
    authMiddleware,
    roleMiddleware(['admin']),
    userController.getUserById
);
router.put(
    '/:id',
    authMiddleware,
    roleMiddleware(['admin']),
    userController.updateUser
);
router.delete(
    '/:id',
    authMiddleware,
    roleMiddleware(['admin']),
    userController.deleteUser
);
module.exports = router;