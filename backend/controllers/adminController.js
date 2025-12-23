// User controller for handling landlords only
const User = require('../models/user');

// Create landlord
const createLandlord = async (req, res) => {
    try {
        const { name, email, phoneNumber, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const landlord = new User({ name, email, phoneNumber, password, role: 'landlord' });
        await landlord.save();
        res.status(201).json({ message: 'Landlord created successfully', landlord });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }   
};

// Get all landlords
const getAllLandlords = async (req, res) => {
    try {
        const landlords = await User.find({ role: 'landlord' }).select('-password');
        res.status(200).json(landlords);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get landlord by ID
const getLandlordById = async (req, res) => {
    try {
        const landlord = await User.findById(req.params.id).select('-password');    
        if (!landlord || landlord.role !== 'landlord') {
            return res.status(404).json({ message: 'Landlord not found' });
        }
        res.status(200).json(landlord);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }   
};

// Update landlord by ID
const updateLandlord = async (req, res) => {
    try {
        const landlord = await User.findById(req.params.id);
        if (!landlord || landlord.role !== 'landlord') {
            return res.status(404).json({ message: 'Landlord not found' });
        }   
        Object.assign(landlord, req.body);
        await landlord.save();
        res.status(200).json({ message: 'Landlord updated successfully', landlord });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete landlord by ID
const deleteLandlord = async (req, res) => {
    try {
        const landlord = await User.findById(req.params.id);
        if (!landlord || landlord.role !== 'landlord') {
            return res.status(404).json({ message: 'Landlord not found' });
        }
        await landlord.remove();
        res.status(200).json({ message: 'Landlord deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createLandlord,
    getAllLandlords,
    getLandlordById,
    updateLandlord,
    deleteLandlord
};

