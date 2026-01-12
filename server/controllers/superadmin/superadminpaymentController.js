import Razorpay from "razorpay";
import crypto from "crypto";
import fs from "fs";

import cloudinary from "../../utils/cloudinary.js";
import upload from "../../utils/upload.js";
import SuperAdminPayment from "../../models/superadmin/SuperAdminPayment.js";

export const upsertSuperAdminPayment = (req, res) => {
  upload.single("qrImage")(req, res, async (err) => {
    try {
      if (err) {
        return res.status(400).json({ message: "QR upload failed" });
      }

      let qrData;

      if (req.file) {
        const existing = await SuperAdminPayment.findOne();

        if (existing?.qrImage?.public_id) {
          await cloudinary.uploader.destroy(existing.qrImage.public_id);
        }

        const uploaded = await cloudinary.uploader.upload(req.file.path, {
          folder: "superadmin/payment",
        });

        qrData = {
          url: uploaded.secure_url,
          public_id: uploaded.public_id,
        };

        fs.unlinkSync(req.file.path);
      }

      const payment = await SuperAdminPayment.findOneAndUpdate(
        {},
        {
          businessName: req.body.businessName,
          paymentNote: req.body.paymentNote,
          upiId: req.body.upiId,
          upiName: req.body.upiName,
          showUpi: req.body.showUpi === "true",
          showQr: req.body.showQr === "true",
          razorpayEnabled: req.body.razorpayEnabled === "true",
          razorpayKeyId: req.body.razorpayKeyId,
          razorpayKeySecret: req.body.razorpayKeySecret,
          isActive: req.body.isActive === "true",
          ...(qrData && { qrImage: qrData }),
        },
        { upsert: true, new: true }
      );

      res.json({ success: true, payment });
    } catch (error) {
      console.error("PAYMENT SETTINGS ERROR:", error);
      res.status(500).json({ message: "Server Error" });
    }
  });
};

/* =====================================================
   🌍 PUBLIC : GET PAYMENT SETTINGS (MAIN WEBSITE)
===================================================== */
export const getPublicSuperAdminPayment = async (req, res) => {
  try {
    const payment = await SuperAdminPayment.findOne({
      isActive: true,
    }).select("-razorpayKeySecret");

    if (!payment) {
      return res.status(404).json({ message: "Payment disabled" });
    }

    res.json({ success: true, payment });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

/* =====================================================
   🌍 PUBLIC : CREATE RAZORPAY ORDER
===================================================== */
export const createOrder = async (req, res) => {
  try {
    const { amount, purpose, customer } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const settings = await SuperAdminPayment.findOne({
      isActive: true,
      razorpayEnabled: true,
    }).select("+razorpayKeySecret");

    if (!settings) {
      return res.status(400).json({ message: "Online payment disabled" });
    }

    const razorpay = new Razorpay({
      key_id: settings.razorpayKeyId,
      key_secret: settings.razorpayKeySecret,
    });

    const order = await razorpay.orders.create({
      amount: Number(amount) * 100,
      currency: "INR",
    });

    await SuperAdminPayment.create({
      orderId: order.id,
      amount: Number(amount),
      currency: "INR",
      purpose,
      customer,
      status: "created",
    });

    res.json({
      success: true,
      orderId: order.id,
      key: settings.razorpayKeyId,
      amount: Number(amount),
      currency: "INR",
    });
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

/* =====================================================
   🌍 PUBLIC : VERIFY RAZORPAY PAYMENT
===================================================== */
export const verifyPayment = async (req, res) => {
  try {
    const { orderId, paymentId, signature } = req.body;

    const settings = await SuperAdminPayment.findOne({
      isActive: true,
    }).select("+razorpayKeySecret");

    const payment = await SuperAdminPayment.findOne({ orderId });

    if (!settings || !payment) {
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

    res.json({ success: true, message: "Payment verified successfully" });
  } catch (error) {
    console.error("VERIFY PAYMENT ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

/* =====================================================
   🔐 SUPERADMIN : GET ALL PAYMENTS
===================================================== */
export const getAllPayments = async (req, res) => {
  try {
    const payments = await SuperAdminPayment.find().sort({
      createdAt: -1,
    });

    res.json({ success: true, payments });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


export const getSuperAdminPayment = async (req, res) => {
  try {
    const payment = await SuperAdminPayment.findOne();
    res.json({ success: true, payment });
  } catch (err) {
    console.error("GET SUPERADMIN PAYMENT ERROR:", err);
    res.status(500).json({ message: "Server Error" });
  }
};