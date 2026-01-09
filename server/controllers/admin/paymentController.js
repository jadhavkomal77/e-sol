import Payment from "../../models/admin/Payment.js";
import Admin from "../../models/Admin.js";
import cloudinary from "../../utils/cloudinary.config.js";
import streamifier from "streamifier";

/* ===== Upload buffer to cloudinary ===== */
const uploadFromBuffer = (buffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "payments/qr" },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });

/* =====================================
   ADMIN : CREATE / UPDATE PAYMENT
===================================== */
export const upsertPaymentSettings = async (req, res) => {
  try {
    const adminId = req.user.id;
    const body = req.body;

    let qrData;

    if (req.file) {
      const existing = await Payment.findOne({ adminId });

      if (existing?.qrImage?.public_id) {
        await cloudinary.uploader.destroy(existing.qrImage.public_id);
      }

      const uploaded = await uploadFromBuffer(req.file.buffer);

      qrData = {
        url: uploaded.secure_url,
        public_id: uploaded.public_id,
      };
    }

    const payment = await Payment.findOneAndUpdate(
      { adminId },
      {
        adminId,
        businessName: body.businessName,
        paymentNote: body.paymentNote,
        upiId: body.upiId,
        upiName: body.upiName,
        showUpi: body.showUpi,
        showQr: body.showQr,
        razorpayKeyId: body.razorpayKeyId,
        razorpayKeySecret: body.razorpayKeySecret,
        razorpayEnabled: body.razorpayEnabled,
        isActive: body.isActive,
        ...(qrData && { qrImage: qrData }),
        updatedBy: adminId,
      },
      { upsert: true, new: true }
    );

    res.json({ success: true, payment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* =====================================
   ADMIN : GET OWN PAYMENT
===================================== */
export const getMyPaymentSettings = async (req, res) => {
  const payment = await Payment.findOne({ adminId: req.user.id });
  res.json(payment);
};

/* =====================================
   PUBLIC : GET PAYMENT BY ADMIN SLUG
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
