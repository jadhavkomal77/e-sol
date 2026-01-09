// models/Payment.js
import mongoose from "mongoose";

const SuperAdminpaymentSchema = new mongoose.Schema({
  orderId: String,
  paymentId: String,
  signature: String,

  amount: {
    type: Number,
    required: true,
  },

  currency: String,

  status: {
    type: String,
    enum: ["created", "paid", "failed"],
    default: "created",
  },

  customer: {
    name: String,
    email: String,
    phone: String,
  },

  purpose: {
    type: String, // Website, Service, Hosting
  },
}, { timestamps: true });

export default mongoose.model("SuperAdminpayment", SuperAdminpaymentSchema);
