const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  name: String,
  title: String,
  role: String,  
  email: String,
  website: String,
  photo: String
});

module.exports = mongoose.model('Profile', ProfileSchema);
