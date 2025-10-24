const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate JWT token with payload including username and role
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send token and role to frontend
    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ error: 'Server error, please try again later' });
  }
});

router.post('/register', async (req, res) => {
    const { username, password, role } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }
  
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: 'Username already taken' });
    }
  
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({ username, passwordHash, role: role || 'user' });
    await newUser.save();
  
    res.status(201).json({ message: 'User created' });
  });

module.exports = router;
