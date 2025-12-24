// Notification controller for handling notifications(Fetching and deleting only)
const Notification = require("../models/notification");


// Get all notifications
const getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find();
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete notification by ID
const deleteNotification = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }   
        await notification.remove();
        res.status(200).json({ message: 'Notification deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }   
};

module.exports = {
    getAllNotifications,
    deleteNotification,
};