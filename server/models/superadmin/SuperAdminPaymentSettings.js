// models/PaymentSettings.js
import mongoose from "mongoose";

const PaymentSettingsSchema = new mongoose.Schema({
  provider: {
    type: String,
    enum: ["razorpay"],
    default: "razorpay",
  },

  razorpayKeyId: {
    type: String,
    required: true,
  },

  razorpayKeySecret: {
    type: String,
    required: true,
  },

  currency: {
    type: String,
    default: "INR",
  },

  isLive: {
    type: Boolean,
    default: false, // test / live
  },

  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

export default mongoose.model(
  "PaymentSettings",
  PaymentSettingsSchema
);
