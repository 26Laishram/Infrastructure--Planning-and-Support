const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
require('dotenv').config();
const jwt = require('jsonwebtoken');




const app = express();

app.use('/uploads', express.static('uploads'));
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/people', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Import and use routes
app.use('/api/people', require('./routes/people'));
app.use('/api/auth', authRoutes);

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
