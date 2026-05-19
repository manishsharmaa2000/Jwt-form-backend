const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check token exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Token Missing",
      });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    // Verify token
    const verify = jwt.verify(token, process.env.JWT_SECRET);

    // Save user data
    req.user = verify;

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

module.exports = authMiddleware;