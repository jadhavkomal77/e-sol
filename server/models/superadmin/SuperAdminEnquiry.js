import mongoose from "mongoose";

const superAdminEnquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    subject: { type: String, required: true },
    message: { type: String, required: true },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SuperAdminProduct",
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Resolved"],
      default: "Pending",
    }
  },
  { timestamps: true }
);

export default mongoose.model("SuperAdminEnquiry", superAdminEnquirySchema);
