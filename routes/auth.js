const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Sign up
router.post('/signup', async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Create a new user (role defaults to 'user')
    const user = new User({
      username,
      email,
      password,
      role: role || 'user',
    });
    await user.save();
    return res.status(201).json({ message: 'User registered successfully!' }); // Added return for consistency
  } catch (error) {
    return res.status(400).json({ message: 'Error registering user' }); // Added return for consistency
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return res.json({ token }); // Ensure a return is used here for consistency
});

module.exports = router;
