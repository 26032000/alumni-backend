const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware for protecting routes
const auth_middleware = async (req, res, next) => {
  // Check if authorization header is provided
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Extract the token from the authorization header
  const token = authHeader.split(' ')[1];

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user with the given ID
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Attach the user to the request object
    req.user = user;

    // Call the next middleware function
    next();
  } catch (error) {
    // If the token is invalid or expired, return an error response
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = auth_middleware;