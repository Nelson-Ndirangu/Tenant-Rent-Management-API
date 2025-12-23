// User routes for signup, login
const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

// Routes
router.post("/register", register);
router.post("/login", login);

module.exports = router;
