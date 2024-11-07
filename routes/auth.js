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
      role: role || 'user', // Added trailing comma for consistency
    });
    await user.save();
    return res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    return res.status(400).json({ message: 'Error registering user' });
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
    { 
      id: user.id,
      role: user.role, // Added trailing comma for consistency
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  ); // No trailing comma here because it's the last property in this block

  return res.json({ token });
});

module.exports = router;
