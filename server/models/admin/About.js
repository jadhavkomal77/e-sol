// models/About.js
import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
    unique: true,   // ⭐ ONE ABOUT PER ADMIN
  },

  mainTitle: String,
  mainDescription: String,

  features: [
    {
      icon: String,
      title: String,
      description: String,
    },
  ],

  stats: {
    year: Number,
    projects: String,
    satisfaction: String,
    coverage: String,
  },
}, { timestamps: true });

export default mongoose.model("About", aboutSchema);
