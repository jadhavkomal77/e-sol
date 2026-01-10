// server/utils/cloudinary.js
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,              // ✅ matches .env
  api_key: process.env.CLOUDINARY_API_KEY,         // ✅
  api_secret: process.env.CLOUDINARY_API_SECRET,   // ✅
});

export default cloudinary;
