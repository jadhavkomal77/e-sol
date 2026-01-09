import SuperAdminFooter from "./../../models/superadmin/SuperAdminFooter.js";
import sanitizeHtml from "sanitize-html";
import validator from "validator";

/* GET Super Admin Footer (Admin Panel + Public) */
export const getSuperAdminFooter = async (req, res) => {
  try {
    let data = await SuperAdminFooter.findOne();

    if (!data) {
      data = await SuperAdminFooter.create({});
    }

    return res.json({ success: true, data });

  } catch (err) {
    console.error("SUPERADMIN FOOTER GET ERROR:", err.message);
    return res.status(500).json({ message: "Server Error" });
  }
};

/* UPDATE Super Admin Footer */
export const updateSuperAdminFooter = async (req, res) => {
  try {
    const {
      brandText,
      copyrightText,
      developedByText,
      showDevelopedBy,
      contact,
      socialLinks,
      links,
    } = req.body;

    if (contact?.email && !validator.isEmail(contact.email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const updatedData = {
      brandText: sanitizeHtml(brandText || ""),
      copyrightText: sanitizeHtml(copyrightText || ""),
      developedByText: sanitizeHtml(developedByText || ""),
      showDevelopedBy,

      contact: {
        phone: sanitizeHtml(contact?.phone || ""),
        email: (contact?.email || "").toLowerCase(),
        address: sanitizeHtml(contact?.address || "")
      },

      socialLinks: socialLinks || {},

     links: Array.isArray(links)
  ? links.map((l, i) => ({
      label: sanitizeHtml(l.label || ""),
      url: sanitizeHtml(l.url || ""),
      type: l.type || "quick", // 🔥 AUTO FIX
      isActive: l.isActive !== false,
      order: i + 1,
    }))
  : [],

    };

    const updated = await SuperAdminFooter.findOneAndUpdate(
      {},
      updatedData,
      { new: true, upsert: true }
    );

    return res.json({ success: true, message: "Footer Updated", data: updated });

  } catch (err) {
    console.error("SUPERADMIN FOOTER UPDATE ERROR:", err.message);
    return res.status(500).json({ message: "Server Error" });
  }
};
