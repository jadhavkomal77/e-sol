// models/PaymentSettings.js
import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    /* ===== ADMIN LINK ===== */
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
      unique: true,
      index: true,
    },

    /* ===== BUSINESS INFO (PUBLIC DISPLAY) ===== */
    businessName: {
      type: String,
      trim: true,
    },

    paymentNote: {
      type: String, // "Pay maintenance amount only"
      trim: true,
      maxlength: 150,
    },

    /* ===== UPI ===== */
    upiId: {
      type: String,
      trim: true,
      lowercase: true,
    },

    upiName: {
      type: String,
      trim: true,
    },

    showUpi: {
      type: Boolean,
      default: true,
    },

    /* ===== QR ===== */
    qrImage: {
      url: { type: String },        // Cloudinary secure_url
      public_id: { type: String },  // Cloudinary public_id
    },

    showQr: {
      type: Boolean,
      default: true,
    },

    /* ===== RAZORPAY ===== */
    razorpayKeyId: {
      type: String,
      select: false, // security 🔐
    },

    razorpayKeySecret: {
      type: String,
      select: false, // security 🔐
    },

    razorpayEnabled: {
      type: Boolean,
      default: false,
    },

    /* ===== STATUS ===== */
    isActive: {
      type: Boolean,
      default: true,
    },

    /* ===== AUDIT ===== */
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
