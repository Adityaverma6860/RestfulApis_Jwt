const express = require("express");
const router = express.Router();

const {
  registerUser,
  currentUser,
  loginUser,
} = require("../controller/userController");
const validateToken = require("../middleware/validateTokenHandler"); // Assuming you have a token validation middleware

// Register user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

// Get current logged-in user (protected route)
router.get("/current", validateToken, currentUser);

module.exports = router;
