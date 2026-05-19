const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

// register
router.post("/register", registerUser);

// login
router.post("/login", loginUser);

// protected route
router.get("/home", authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: "Profile Accessed",
    user: req.user,
  });
});

module.exports = router;