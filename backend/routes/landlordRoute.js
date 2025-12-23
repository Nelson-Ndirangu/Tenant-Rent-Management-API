// Landlord routes
const express = require("express");
const router = express.Router();
const {
  createLandlord,
  getAllLandlords,
  getLandlordById,
  updateLandlord,
  deleteLandlord,
} = require("../controllers/landlordController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Routes
router.post("/", authMiddleware, roleMiddleware(["admin"]), createLandlord);

router.get("/", authMiddleware, roleMiddleware(["admin"]), getAllLandlords);

router.get("/:id", authMiddleware, roleMiddleware(["admin"]), getLandlordById);
router.put("/:id", authMiddleware, roleMiddleware(["admin"]), updateLandlord);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  deleteLandlord
);

module.exports = router;
