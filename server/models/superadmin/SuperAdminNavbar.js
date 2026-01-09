// models/SuperAdminNavbar.js
import mongoose from "mongoose";

const superAdminNavbarSchema = new mongoose.Schema(
  {
    brandName: {
      type: String,
      default: "My Business",
    },
    tagline: {
      type: String,
      default: "",
    },

   buttons: [
  {
    label: { type: String, required: true },
    type: { type: String, enum: ["section", "path"], default: "section" },
    section: { type: String, default: "" },
    path: { type: String, default: "" },
    isPrimary: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
],

  },
  { timestamps: true }
);

export default mongoose.model("SuperAdminNavbar", superAdminNavbarSchema);
