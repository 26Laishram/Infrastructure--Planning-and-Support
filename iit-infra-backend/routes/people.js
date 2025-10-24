const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Profile = require('../models/Profile');
const { authenticateToken, requireAdmin } = require('../middlewares/auth');

// Multer configuration for file storage
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/'); // make sure uploads/ folder exists
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`); // unique filename with extension
  }
});

const upload = multer({ storage });


// GET all people, or filter by role
router.get('/', async (req, res) => {
  const { role } = req.query;
  const query = role ? { role } : {};
  const profiles = await Profile.find(query);
  res.json(profiles);
});

// POST endpoint to add a profile with photo upload
router.post(
  '/',
  authenticateToken,
  requireAdmin,
  upload.single('photo'),  // handle single file upload under field 'photo'
  async (req, res) => {
    try {
      const { name, title, role, email, website } = req.body;
      // If file uploaded, save file path in photo field, else empty string
      const photo = req.file ? `/uploads/${req.file.filename}` : '';

      const profile = new Profile({ name, title, role, email, website, photo });
      await profile.save();

      res.status(201).json(profile);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// GET profile by id
router.get('/:id', async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ error: "Profile not found" });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update profile by id with optional photo upload
router.put(
  '/:id',
  authenticateToken,
  requireAdmin,
  upload.single('photo'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = { ...req.body };

      // If new photo uploaded, update photo path
      if (req.file) {
        updateData.photo = `/uploads/${req.file.filename}`;
      }

      const updatedProfile = await Profile.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedProfile) return res.status(404).json({ error: "Profile not found" });

      res.json(updatedProfile);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;
