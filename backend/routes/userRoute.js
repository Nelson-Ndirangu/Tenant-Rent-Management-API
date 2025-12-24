// User routes with authentication and role-based access control
const express = require("express");
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const router = express.Router();

// Create user
router.post("/", authMiddleware, roleMiddleware(["admin"]), createUser);
// Get all users
router.get("/", authMiddleware, roleMiddleware(["admin"]), getAllUsers);
// Get user by ID
router.get("/:id", authMiddleware, roleMiddleware(["admin"]), getUserById);
// Update user by ID
router.put("/:id", authMiddleware, roleMiddleware(["admin"]), updateUser);
// Delete user by ID
router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), deleteUser);

module.exports = router;
