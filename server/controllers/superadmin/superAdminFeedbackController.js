import SuperAdminFeedback from "../../models/superadmin/SuperAdminFeedback.js";
import sanitizeHtml from "sanitize-html";
import validator from "validator";

/* 🌍 PUBLIC - Create Feedback */
export const createFeedback = async (req, res) => {
  try {
    const cleanData = {
      name: sanitizeHtml(req.body.name),
      email: req.body.email.toLowerCase(),
      rating: req.body.rating,
      message: sanitizeHtml(req.body.message),
      status: "Pending",
    };

    await SuperAdminFeedback.create(cleanData);
    res.status(201).json({ success: true, message: "Feedback Submitted Successfully!" });

  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

/* 🌍 PUBLIC - Get Only Approved Feedback */
export const getPublicFeedback = async (req, res) => {
  try {
    const list = await SuperAdminFeedback.find({
      status: "Resolved",
    }).sort({ createdAt: -1 });

    res.json({ success: true, feedback: list });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

/* 🔐 ADMIN PANEL */
export const getSuperAdminFeedback = async (req, res) => {
  try {
    const list = await SuperAdminFeedback.find().sort({ createdAt: -1 });
    res.json({ success: true, feedback: list });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

/* 🔐 Update Status */
export const updateFeedbackStatus = async (req, res) => {
  try {
    const fb = await SuperAdminFeedback.findById(req.params.id);
    if (!fb) return res.status(404).json({ message: "Not Found" });

    fb.status = req.body.status;
    await fb.save();

    res.json({ success: true, message: "Updated", fb });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

/* 🔐 Delete */
export const deleteFeedback = async (req, res) => {
  try {
    await SuperAdminFeedback.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
