// Property routes
const express = require("express");
const {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} = require("../controllers/propertyController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const router = express.Router();

// Create property
router.post("/", authMiddleware, roleMiddleware(["admin"]), createProperty);
// Get all properties
router.get("/", authMiddleware, roleMiddleware(["admin"]), getAllProperties);
// Get property by ID
router.get("/:id", authMiddleware, roleMiddleware(["admin"]), getPropertyById);
// Update property by ID
router.put("/:id", authMiddleware, roleMiddleware(["admin"]), updateProperty);
// Delete property by ID
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  deleteProperty
);

module.exports = router;
