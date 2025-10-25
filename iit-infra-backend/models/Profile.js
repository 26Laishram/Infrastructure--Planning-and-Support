import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  name: String,
  title: String,
  role: String,  
  email: String,
  website: String,
  photo: String
});

export default mongoose.model('Profile', ProfileSchema);
