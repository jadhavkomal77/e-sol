import SuperAdminPaymentSettings from "../../models/superadmin/SuperAdminPaymentSettings.js";

/* ===== GET PUBLIC PAYMENT SETTINGS ===== */
export const getPublicPayment = async (req, res) => {
  try {
    const payment = await SuperAdminPaymentSettings.findOne({ isActive: true });

    res.json({
      success: true,
      payment: payment || null,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

/* ===== SUPERADMIN UPDATE PAYMENT ===== */
export const updatePaymentSettings = async (req, res) => {
  try {
    const { amount, title, isActive } = req.body;

    const payment = await SuperAdminPaymentSettings.findOneAndUpdate(
      {},
      { amount, title, isActive },
      { new: true, upsert: true }
    );

    res.json({ success: true, payment });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
