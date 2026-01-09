import mongoose from "mongoose";

const superAdminFooterSchema = new mongoose.Schema({
  brandText: { type: String, default: "" },
  copyrightText: { type: String, default: "" },

  developedByText: { type: String, default: "Designed & Developed by SuperAdmin" },
  showDevelopedBy: { type: Boolean, default: true },

  contact: {
    phone: { type: String, default: "" },
    email: { type: String, default: "" },
    address: { type: String, default: "" },
  },

  socialLinks: {
    instagram: { type: String, default: "" },
    twitter: { type: String, default: "" },
    facebook: { type: String, default: "" },
    linkedin: { type: String, default: "" },
  },

 links: [
  {
    label: { type: String, default: "" },
    url: { type: String, default: "" },
    type: { type: String, enum: ["quick", "important"], default: "quick" }, // 🔥
    isActive: { type: Boolean, default: true },
    order: Number,
  },
],


}, { timestamps: true });

export default mongoose.model("SuperAdminFooter", superAdminFooterSchema);
