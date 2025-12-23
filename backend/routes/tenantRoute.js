// Tenant routes
const express = require("express");
const router = express.Router();
const {
  createTenant,
  getAllTenants,
  getTenantById,
  updateTenant,
  deleteTenant } = require("../controllers/tenantController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Routes

// Create a new tenant
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "landlord"]),
  createTenant
);

// Get all tenants
router.get(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "landlord"]),
  getAllTenants
);

// Get tenant by ID
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "landlord"]),
  getTenantById
);

// Update tenant by ID
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "landlord"]),
  updateTenant
);

// Delete tenant by ID
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "landlord"]),
  deleteTenant
);

module.exports = router;
