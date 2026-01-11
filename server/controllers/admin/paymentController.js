

import Payment from "../../models/admin/Payment.js";
import Admin from "../../models/Admin.js";
import cloudinary from "../../utils/cloudinary.js";
import upload from "../../utils/upload.js";
import fs from "fs";


export const upsertPaymentSettings = (req, res) => {
  upload.single("qrImage")(req, res, async (err) => {
    try {
      if (err) {
        return res.status(400).json({ message: "QR upload failed" });
      }

      const adminId = req.user.id;
      const body = req.body;

      let qrData;

      if (req.file) {
        const existing = await Payment.findOne({ adminId });

        // delete old QR
        if (existing?.qrImage?.public_id) {
          await cloudinary.uploader.destroy(
            existing.qrImage.public_id
          );
        }

        const uploaded = await cloudinary.uploader.upload(
          req.file.path,
          { folder: `payments/${adminId}` }
        );

        qrData = {
          url: uploaded.secure_url,
          public_id: uploaded.public_id,
        };

        fs.unlinkSync(req.file.path);
      }

      const payment = await Payment.findOneAndUpdate(
        { adminId },
        {
          adminId,
          businessName: body.businessName,
          paymentNote: body.paymentNote,
          upiId: body.upiId,
          upiName: body.upiName,
          showUpi: body.showUpi === "true",
          showQr: body.showQr === "true",
          razorpayEnabled: body.razorpayEnabled === "true",
          razorpayKeyId: body.razorpayKeyId,
          razorpayKeySecret: body.razorpayKeySecret,
          isActive: body.isActive === "true",
          ...(qrData && { qrImage: qrData }),
          updatedBy: adminId,
        },
        { upsert: true, new: true }
      );

      res.json({ success: true, payment });
    } catch (error) {
      console.error("PAYMENT UPSERT ERROR:", error);
      res.status(500).json({ message: "Server Error" });
    }
  });
};

/* =====================================
   ADMIN : GET OWN PAYMENT
===================================== */
export const getMyPaymentSettings = async (req, res) => {
  const payment = await Payment.findOne({ adminId: req.user.id });
  res.json({ success: true, payment });
};

/* =====================================
   PUBLIC : GET PAYMENT BY SLUG
===================================== */
export const getPublicPaymentSettings = async (req, res) => {
  const admin = await Admin.findOne({
    websiteSlug: req.params.slug,
    isActive: true,
  });

  if (!admin) {
    return res.status(404).json({ message: "Admin not found" });
  }

  const payment = await Payment.findOne({
    adminId: admin._id,
    isActive: true,
  });

  res.json({ success: true, payment });
};
