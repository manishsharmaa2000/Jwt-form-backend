const User = require("../models/RegisterUser");
const bcrypt = require("bcryptjs");

// Create User
const createUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
    } = req.body;

    // Validation Regex
    const nameRegex = /^[A-Za-z ]{2,50}$/;
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex =
      /^[0-9]{10}$/;

    // Name Validation
    if (!name || !nameRegex.test(name)) {
      return res.status(400).json({
        success: false,
        message:
          "Name must contain only letters and be 2-50 characters long",
      });
    }

    // Email Validation
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email Address",
      });
    }

    // Phone Validation
    if (!phone || !phoneRegex.test(phone)) {
      return res.status(400).json({
        success: false,
        message:
          "Phone Number must be exactly 10 digits",
      });
    }

    // Password Validation
    if (!password || password.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 6 characters long",
      });
    }

    // Existing User Check
    const existingUser =
      await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists",
      });
    }

    // Hash Password
    const hashedPassword =
      await bcrypt.hash(password, 10);

    // Create User
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      phone,
    });

    res.status(201).json({
      success: true,
      message:
        "User Created Successfully",
      user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get Users
const getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    const user =
      await User.findByIdAndDelete(
        req.params.id
      );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "User Deleted Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  createUser,
  getUsers,
  deleteUser,
};