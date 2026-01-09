import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    subject: { type: String, required: true },
    message: { type: String, required: true },

    status: {
      type: String,
      enum: ["Pending", "Resolved"],
      default: "Pending",
    },

    // ⭐ which admin will receive enquiry
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true
    },

    // user who made enquiry (optional)
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);


export default mongoose.model("Enquiry", enquirySchema);
