const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization');
  
  // Add curly braces for the 'if' statement and move the return to the same line
  if (!token) {
    return res.status(401).json({ message: 'Access denied, no token provided' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET); // Extract token
    req.user = decoded;
    next(); // No return value needed here
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token' }); // Return in case of error
  }
};

module.exports = authenticateJWT;

