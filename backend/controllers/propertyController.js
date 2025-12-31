// Property controller
const Property = require("../models/property");

// Create property
const createProperty = async (req, res) => {
  try {
    // Creating a new property
    const {landlordId, propertyName, location, county } = req.body;
    const property = new Property({ landlordId, propertyName, location, county });
    await property.save();
    res
      .status(201)
      .json({ message: "Property created successfully", property });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all properties
const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get property by ID
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update property by ID

const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    Object.assign(property, req.body);
    await property.save();
    res
      .status(200)
      .json({ message: "Property updated successfully", property });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete property by ID
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    await property.remove();
    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
};
