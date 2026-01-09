import mongoose from "mongoose";

const websiteSettingsSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
      unique: true,
    },

    // Website Branding
    logo: { type: String },                 // Cloudinary URL
    favicon: { type: String },

    // Hero Section
    heroTitle: { type: String, default: "Welcome to our website" },
    heroSubtitle: { type: String, default: "We provide the best services" },
    heroImage: { type: String },

    // Theme Colors
    primaryColor: { type: String, default: "#0a0a0a" },
    secondaryColor: { type: String, default: "#ffffff" },

    // Social Links
    facebook: { type: String },
    instagram: { type: String },
    youtube: { type: String },
    whatsapp: { type: String },

    // Contact Visibility Controls
    showPhone: { type: Boolean, default: true },
    showEmail: { type: Boolean, default: true },

    // Footer
    footerText: { type: String, default: "© All rights reserved." }
  },
  { timestamps: true }
);

export default mongoose.model("WebsiteSettings", websiteSettingsSchema);
