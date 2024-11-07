const authorizeRoles = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Access denied' });
  }
  // Always call next when roles are authorized
  return next();
};

module.exports = authorizeRoles;
