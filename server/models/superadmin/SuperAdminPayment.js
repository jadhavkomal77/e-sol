import mongoose from "mongoose";

const superAdminPaymentSchema = new mongoose.Schema(
  {
    /* ===== BUSINESS INFO ===== */
    businessName: {
      type: String,
      trim: true,
    },

    paymentNote: {
      type: String,
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
      url: String,
      public_id: String,
    },

    showQr: {
      type: Boolean,
      default: true,
    },

    /* ===== RAZORPAY ===== */
    razorpayKeyId: {
      type: String,
      select: false,
    },

    razorpayKeySecret: {
      type: String,
      select: false,
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
  },
  { timestamps: true }
);

export default mongoose.model(
  "SuperAdminPayment",
  superAdminPaymentSchema
);
