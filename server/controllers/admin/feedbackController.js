
import Feedback from "../../models/admin/Feedback.js";
import validator from "validator";
import sanitizeHtml from "sanitize-html";

/* ======================================================
   PRIVATE USER → CREATE FEEDBACK
====================================================== */
export const createFeedback = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Login required" });
    }

    let { name, email, rating, message } = req.body;

    // 🛑 Validate Inputs
    if (!name || !email || !rating || !message) {
      return res.status(400).json({ message: "All fields required" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }
    if (!validator.isInt(rating.toString(), { min: 1, max: 5 })) {
      return res.status(400).json({ message: "Rating must be 1-5" });
    }

    // 🧹 Sanitize Inputs
    name = sanitizeHtml(name);
    message = sanitizeHtml(message);

    const fb = await Feedback.create({
      name,
      email: email.toLowerCase(),
      rating,
      message,
      adminId: req.adminId || null,
      userId: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",
      feedback: fb,
    });

  } catch (err) {
    console.error("FEEDBACK CREATE ERROR:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

/* ======================================================
   PUBLIC → CREATE FEEDBACK (NO LOGIN REQUIRED)
====================================================== */
export const createPublicFeedback = async (req, res) => {
  try {
    let { name, email, rating, message } = req.body;

    if (!name || !email || !rating || !message) {
      return res.status(400).json({ message: "All fields required" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }
    if (!validator.isInt(rating.toString(), { min: 1, max: 5 })) {
      return res.status(400).json({ message: "Rating must be 1-5" });
    }

    name = sanitizeHtml(name);
    message = sanitizeHtml(message);

    if (!req.adminId) {
      return res.status(400).json({ message: "Admin not resolved" });
    }

    const fb = await Feedback.create({
      name,
      email: email.toLowerCase(),
      rating,
      message,
      adminId: req.adminId,
      userId: null,
    });

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",
      feedback: fb,
    });

  } catch (err) {
    console.error("FEEDBACK PUBLIC ERROR:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

/* ======================================================
   ADMIN → ALL FEEDBACKS
====================================================== */
export const getAllFeedbacks = async (req, res) => {
  try {
    const list = await Feedback.find({ adminId: req.user.id })
      .sort({ createdAt: -1 });

    res.json({ success: true, total: list.length, feedbacks: list });

  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

/* ======================================================
   USER → MY FEEDBACKS
====================================================== */
export const getMyFeedbacks = async (req, res) => {
  try {
    const list = await Feedback.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.json({ success: true, total: list.length, feedbacks: list });

  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

/* ======================================================
   ADMIN → UPDATE FEEDBACK STATUS
====================================================== */

export const updateFeedbackStatus = async (req, res) => {
  const { status } = req.body;

  if (!["Pending", "Resolved"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const fb = await Feedback.findById(req.params.id);
  if (!fb) return res.status(404).json({ message: "Not found" });

  if (fb.adminId.toString() !== req.user.id) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  fb.status = status;
  await fb.save();

  res.json({ success: true, feedback: fb });
};


/* ======================================================
   ADMIN → DELETE FEEDBACK
====================================================== */
export const deleteFeedback = async (req, res) => {
  try {
    const fb = await Feedback.findById(req.params.id);

    if (!fb) return res.status(404).json({ message: "Not found" });

    if (fb.adminId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await fb.deleteOne();

    res.json({
      success: true,
      message: "Feedback deleted successfully",
    });

  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
