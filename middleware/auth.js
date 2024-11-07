const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Access denied, no token provided' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET); // Extract token
    req.user = decoded;
    return next(); // Add return here
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token' }); // Return in case of error
  }
};

module.exports = authenticateJWT;
