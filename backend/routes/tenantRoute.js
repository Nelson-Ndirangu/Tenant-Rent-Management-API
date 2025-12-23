// Tenant routes
const express = require("express");
const router = express.Router();
const tenantController = require("../controllers/tenantController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Routes
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "landlord", "tenant"]),
  tenantController.createTenant
);

router.get(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "landlord"]),
  tenantController.getAllTenants
);

router.get(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "landlord"]),
  tenantController.getTenantById
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "landlord"]),
  tenantController.updateTenant
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "landlord"]),
  tenantController.deleteTenant
);

module.exports = router;