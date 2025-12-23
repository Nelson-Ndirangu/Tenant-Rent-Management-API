// Tenant Controller 
const Tenant = require('../models/tenant');

// Create a new tenant
exports.createTenant = async (req, res) => {
    try {
        const { userId, propertyId, unitId, leaseStartDate, leaseEndDate, status } = req.body;
        const tenant = new Tenant({ userId, propertyId, unitId, leaseStartDate, leaseEndDate, status });
        await tenant.save();
        res.status(201).json({ message: 'Tenant created successfully', tenant });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all tenants
exports.getAllTenants = async (req, res) => {
    try {
        const tenants = await Tenant.find().populate('userId propertyId unitId');
        res.status(200).json(tenants);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get tenant by ID

exports.getTenantById = async (req, res) => {
    try {
        const tenant = await Tenant.findById(req.params.id).populate('userId propertyId unitId');
        if (!tenant) {
            return res.status(404).json({ message: 'Tenant not found' });
        }
        res.status(200).json(tenant);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update tenant by ID
exports.updateTenant = async (req, res) => {
    try {
        const tenant = await Tenant.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!tenant) {
            return res.status(404).json({ message: 'Tenant not found' });
        }
        res.status(200).json({ message: 'Tenant updated successfully', tenant });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete tenant by ID
exports.deleteTenant = async (req, res) => {
    try {
        const tenant = await Tenant.findByIdAndDelete(req.params.id);
        if (!tenant) {
            return res.status(404).json({ message: 'Tenant not found' });
        }
        res.status(200).json({ message: 'Tenant deleted successfully', tenant });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Exporting all controller functions
module.exports = {
    createTenant,
    getAllTenants,
    getTenantById,
    updateTenant,
    deleteTenant
};

