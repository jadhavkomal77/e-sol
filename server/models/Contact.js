import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    name: String,
    email: String,
    phone: String,
    service: String,
    message: String,

    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true, // ⭐ always required
    },
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);
