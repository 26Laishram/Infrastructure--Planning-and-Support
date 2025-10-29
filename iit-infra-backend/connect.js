import mongoose from "mongoose";

const uri = "mongodb+srv://ipswebsite:ipswebsite@cluster0.4yx435c.mongodb.net/";

mongoose.connect(uri)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.error("❌ Connection error:", err));
