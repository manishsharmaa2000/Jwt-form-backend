const User = require("../models/RegisterUser");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

// ================= REGISTER =================

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // check existing user
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists",
      });
    }

    // password hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      data: newUser,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
       error: error.message
    });
  }
};

// ================= LOGIN =================

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email",
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    // generate token
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
       error: error.message

    });
  }
};