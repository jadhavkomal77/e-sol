import mongoose from "mongoose";

const superAdminProductSchema = new mongoose.Schema(
  {
    superAdminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SuperAdmin",
      required: true,
    },

    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },

    features: [{ type: String }],

    // For Image Upload via Multer + Cloudinary
    image: { type: String, default: "" },

    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Performance indexes
superAdminProductSchema.index({ superAdminId: 1 });
superAdminProductSchema.index({ superAdminId: 1, status: 1 });
superAdminProductSchema.index({ category: 1 });

export default mongoose.model("SuperAdminProduct", superAdminProductSchema);
