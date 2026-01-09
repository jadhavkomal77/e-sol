

import Admin from "../models/Admin.js";
import sanitizeHtml from "sanitize-html";
import validator from "validator";

export const assignToAdmin = async (req, res) => {
  try {
    const { adminId, products, services, slug } = req.body;

    // 🛑 Role Validation (SuperAdmin Only)
    if (!req.user || req.user.role !== "superadmin") {
      return res.status(403).json({ message: "Access Denied: SuperAdmin Only" });
    }

    // 🛑 Admin ID Validation
    if (!adminId || !validator.isMongoId(adminId)) {
      return res.status(400).json({ message: "Valid Admin ID required" });
    }

    // 🚫 Products / Services type validation
    if (products && !Array.isArray(products)) {
      return res.status(400).json({ message: "Products must be array" });
    }
    if (services && !Array.isArray(services)) {
      return res.status(400).json({ message: "Services must be array" });
    }

    let updateData = {};

    // 🔐 Merge assignments — Smart Update
    const admin = await Admin.findById(adminId);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    updateData.assignedProducts = [
      ...new Set([...(admin.assignedProducts || []), ...(products || [])])
    ];

    updateData.assignedServices = [
      ...new Set([...(admin.assignedServices || []), ...(services || [])])
    ];

    // 🌍 Slug Update
    if (slug) {
      const cleanSlug = sanitizeHtml(slug.toLowerCase());
      const exists = await Admin.findOne({
        _id: { $ne: adminId },
        websiteSlug: cleanSlug
      });

      if (exists)
        return res.status(400).json({ message: "Slug already in use" });

      updateData.websiteSlug = cleanSlug;
    }

    const updated = await Admin.findByIdAndUpdate(adminId, updateData, {
      new: true
    }).select("-password");

    res.json({
      success: true,
      message: "Admin Data Updated Successfully",
      admin: updated
    });
  } catch (err) {
    console.error("ASSIGN ERROR:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};
