

import sanitizeHtml from "sanitize-html";
import validator from "validator";
import Footer from "../../models/admin/Footer.js";


export const getFooter = async (req, res) => {
  try {
    const adminId = req.user?.id || req.adminId;

    if (!adminId) {
      return res.status(400).json({ message: "Admin not resolved" });
    }

    let footer = await Footer.findOne({ adminId });

    /* 🆕 First time admin → create default footer */
    if (!footer) {
      footer = await Footer.create({ adminId });
    }

    return res.json({
      success: true,
      data: footer,
    });
  } catch (err) {
    console.error("FOOTER GET ERROR:", err.message);
    return res.status(500).json({ message: "Server Error" });
  }
};

/* =====================================================
   UPDATE FOOTER (Admin Panel Only)
===================================================== */
export const updateFooter = async (req, res) => {
  try {
    const adminId = req.user.id;

    const {
      brandText,
      copyrightText,
      developedByText,
      showDevelopedBy,
      contact,
      socialLinks,
      links,
    } = req.body;

    /* ✅ Email validation */
    if (contact?.email && !validator.isEmail(contact.email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const updatedData = {
      adminId,

      brandText: sanitizeHtml(brandText || ""),
      copyrightText: sanitizeHtml(copyrightText || ""),
      developedByText: sanitizeHtml(developedByText || ""),
      showDevelopedBy,

      contact: {
        phone: sanitizeHtml(contact?.phone || ""),
        email: (contact?.email || "").toLowerCase(),
        address: sanitizeHtml(contact?.address || ""),
      },

      socialLinks: {
        instagram: sanitizeHtml(socialLinks?.instagram || ""),
        twitter: sanitizeHtml(socialLinks?.twitter || ""),
        facebook: sanitizeHtml(socialLinks?.facebook || ""),
        linkedin: sanitizeHtml(socialLinks?.linkedin || ""),
      },

      links: Array.isArray(links)
        ? links.map((l, i) => ({
            label: sanitizeHtml(l.label || ""),
            url: sanitizeHtml(l.url || ""),
            type: l.type || "quick", // 🔥 auto-fix
            isActive: l.isActive !== false,
            order: i + 1,
          }))
        : [],
    };

    const footer = await Footer.findOneAndUpdate(
      { adminId },
      updatedData,
      { new: true, upsert: true }
    );

    return res.json({
      success: true,
      message: "Footer updated successfully",
      data: footer,
    });
  } catch (err) {
    console.error("FOOTER UPDATE ERROR:", err.message);
    return res.status(500).json({ message: "Server Error" });
  }
};




