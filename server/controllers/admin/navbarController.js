
import Navbar from "../../models/admin/Navbar.js";
import sanitizeHtml from "sanitize-html";
import validator from "validator";


export const getPublicNavbar = async (req, res) => {
  try {
    if (!req.adminId) {
      return res.status(400).json({ message: "Admin not resolved" });
    }

    const navbar = await Navbar.findOne({ adminId: req.adminId });

    return res.json({
  success: true,
  brandName: navbar?.brandName || "",
  tagline: navbar?.tagline || "",
  buttons: navbar?.buttons || [],
});


  } catch (err) {
    console.error("GET NAVBAR ERROR:", err.message);
    return res.status(500).json({ message: "Server Error" });
  }
};


export const saveNavbar = async (req, res) => {
  try {
    const adminId = req.user?.id;
    if (!adminId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    let { brandName, tagline, buttons } = req.body;

    brandName = sanitizeHtml(brandName || "");
    tagline = sanitizeHtml(tagline || "");

    const existingNavbar = await Navbar.findOne({ adminId });

    let finalButtons = existingNavbar?.buttons || [];

    if (Array.isArray(buttons) && buttons.length > 0) {
      finalButtons = buttons.map((btn) => ({
        label: sanitizeHtml(btn.label || ""),
        section: sanitizeHtml(btn.section || ""),
        path: sanitizeHtml(btn.path || ""),
        isPrimary: !!btn.isPrimary,
        isActive: btn.isActive !== false,
        order: Number(btn.order) || 0,
      }));
    }

    const navbar = await Navbar.findOneAndUpdate(
      { adminId },
      {
        adminId,
        brandName: brandName || existingNavbar?.brandName,
        tagline: tagline || existingNavbar?.tagline,
        buttons: finalButtons, // ✅ SAFE
      },
      { new: true, upsert: true }
    );

    res.json({
      success: true,
      message: "Navbar updated successfully",
      navbar,
    });
  } catch (err) {
    console.error("NAVBAR UPDATE ERROR:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};
