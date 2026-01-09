import mongoose from "mongoose";

const superAdminServiceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, default: "Settings" },
    features: [{ type: String }],
    buttonText: { type: String, default: "Learn More" },
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("SuperAdminService", superAdminServiceSchema);
