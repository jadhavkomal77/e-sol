
import Razorpay from "razorpay";
import crypto from "crypto";

import SuperAdminPayment from "../../models/superadmin/SuperAdminPayment.js";
import SuperAdminPaymentSettings from "../../models/superadmin/SuperAdminPaymentSettings.js";

/* ================= CREATE ORDER (PUBLIC) ================= */
export const createOrder = async (req, res) => {
  try {
    const { amount, purpose, customer } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const settings = await SuperAdminPaymentSettings.findOne({ isActive: true });
    if (!settings) {
      return res.status(400).json({ message: "Payment is disabled" });
    }

    const razorpay = new Razorpay({
      key_id: settings.razorpayKeyId,
      key_secret: settings.razorpayKeySecret,
    });

    const order = await razorpay.orders.create({
      amount: Number(amount) * 100,
      currency: settings.currency || "INR",
    });

    await SuperAdminPayment.create({
      orderId: order.id,
      amount: Number(amount),
      currency: settings.currency,
      purpose,
      customer,
      status: "created",
    });

    res.json({
      orderId: order.id,
      key: settings.razorpayKeyId,
      currency: settings.currency,
      amount: Number(amount),
      purpose,
    });
  } catch (err) {
    console.error("CREATE ORDER ERROR:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

/* ================= VERIFY PAYMENT ================= */
export const verifyPayment = async (req, res) => {
  try {
    const { orderId, paymentId, signature } = req.body;

    const settings = await SuperAdminPaymentSettings.findOne({ isActive: true });
    const payment = await SuperAdminPayment.findOne({ orderId });

    if (!payment || !settings) {
      return res.status(404).json({ message: "Payment not found" });
    }

    const expectedSignature = crypto
      .createHmac("sha256", settings.razorpayKeySecret)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    if (expectedSignature !== signature) {
      payment.status = "failed";
      await payment.save();
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    payment.paymentId = paymentId;
    payment.signature = signature;
    payment.status = "paid";
    await payment.save();

    res.json({ success: true, message: "Payment verified" });
  } catch (err) {
    console.error("VERIFY PAYMENT ERROR:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

/* ================= SUPERADMIN – ALL PAYMENTS ================= */
export const getAllPayments = async (req, res) => {
  try {
    const payments = await SuperAdminPayment.find().sort({ createdAt: -1 });
    res.json({ success: true, payments });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
