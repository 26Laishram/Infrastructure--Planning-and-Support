import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import Profile from "../models/Profile.js";
import { authenticateToken, requireAdmin } from "../middlewares/auth.js";

const router = express.Router();

// Ensure uploads folder exists
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Multer configuration
const storage = multer.diskStorage({
  destination(req, file, cb) { cb(null, uploadDir); },
  filename(req, file, cb) { cb(null, `${Date.now()}${path.extname(file.originalname)}`); }
});

const upload = multer({ 
  storage,
  fileFilter(req, file, cb) {
    if (!file.mimetype.startsWith('image/')) cb(new Error('Only images allowed!'));
    else cb(null, true);
  },
  limits: { fileSize: 2 * 1024 * 1024 }
});

// GET all profiles (optional filter by role)
router.get('/', async (req, res) => {
  const { role } = req.query;
  const query = role ? { role } : {};
  const profiles = await Profile.find(query);
  res.json(profiles);
});

// POST create profile
router.post('/', authenticateToken, requireAdmin, upload.single('photo'), async (req, res) => {
  try {
    const { name, title, role, email, website } = req.body;
    if (!name || !title || !role || !email) return res.status(400).json({ error: "All required fields must be provided" });

    const photo = req.file ? `/uploads/${req.file.filename}` : '';
    const profile = new Profile({ name, title, role, email, website, photo });
    await profile.save();

    res.status(201).json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET profile by ID
router.get('/:id', async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ error: "Profile not found" });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update profile by ID
router.put('/:id', authenticateToken, requireAdmin, upload.single('photo'), async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    if (req.file) updateData.photo = `/uploads/${req.file.filename}`;

    const updatedProfile = await Profile.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedProfile) return res.status(404).json({ error: "Profile not found" });

    res.json(updatedProfile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
