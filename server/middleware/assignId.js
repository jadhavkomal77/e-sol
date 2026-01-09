

import Admin from "../models/Admin.js";
import validator from "validator";
import sanitizeHtml from "sanitize-html";

export const attachAdminId = async (req, res, next) => {
  try {
    // ⭐ If User is Authenticated as Admin → Dashboard
    if (req.user?.role === "admin" && validator.isMongoId(req.user?.id)) {
      req.adminId = req.user.id;
      return next();
    }

    // 🌍 Public Website Access via Slug
    const { slug } = req.params;

    if (!slug) {
      return res.status(400).json({ message: "Slug missing" });
    }

    // Prevent XSS + Injection
    const cleanSlug = sanitizeHtml(slug.toLowerCase().trim());

    // Database Lookup
    const admin = await Admin.findOne({
      websiteSlug: cleanSlug,
      isActive: true,
    }).select("_id role");

    if (!admin) {
      return res.status(404).json({ message: "Website not found or inactive" });
    }

    // 🏆 Attach the Admin ID for use in controller
    req.adminId = admin._id;

    return next();
  } catch (err) {
    console.error("attachAdminId Error:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
