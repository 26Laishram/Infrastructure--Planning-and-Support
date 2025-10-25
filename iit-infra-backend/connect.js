import mongoose from "mongoose";

const uri = "mongodb+srv://munglem:key1board23@cluster0.i6h8hoe.mongodb.net/test";

mongoose.connect(uri)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.error("❌ Connection error:", err));
