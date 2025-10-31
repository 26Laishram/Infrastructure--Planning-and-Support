import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: 'Invalid username or password' });

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) return res.status(401).json({ error: 'Invalid username or password' });

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET not set');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, role: user.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error, please try again later' });
  }
});

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password) return res.status(400).json({ error: 'Username and password required' });

  const existingUser = await User.findOne({ username });
  if (existingUser) return res.status(409).json({ error: 'Username already taken' });

  const validRoles = ['user', 'admin'];
  if (role && !validRoles.includes(role)) return res.status(400).json({ error: 'Invalid role specified' });

  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = new User({ username, passwordHash, role: role || 'user' });
  await newUser.save();

  res.status(201).json({ 
    message: 'User created', 
    user: { id: newUser._id, username: newUser.username, role: newUser.role } 
  });
});

export default router;
