import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    features: [{ type: String }],
    buttonText: { type: String, default: "Learn More" },
    status: { type: Boolean, default: true },

    // ⭐ Isolation
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true },
  },
  { timestamps: true }
);


export default mongoose.model("Service", serviceSchema);
