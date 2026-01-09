import sanitizeHtml from "sanitize-html";
import SuperAdminNavbar from "../../models/superadmin/SuperAdminNavbar.js";

/* ======================================================
   🌍 PUBLIC → GET NAVBAR
====================================================== */
export const getPublicNavbar = async (req, res) => {
  try {
    const navbar = await SuperAdminNavbar.findOne();

    res.json({
      success: true,
      navbar: navbar || {
        brandName: "",
        tagline: "",
        buttons: [],
      },
    });
  } catch (err) {
    console.error("GET NAVBAR ERROR:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

/* ======================================================
   🛡️ SUPERADMIN → SAVE NAVBAR
====================================================== */
export const saveNavbar = async (req, res) => {
  try {
    if (req.user?.role !== "superadmin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    let { brandName, tagline, buttons } = req.body;

    brandName = sanitizeHtml(brandName || "");
    tagline = sanitizeHtml(tagline || "");

    // ✅ CLEAN + FIX BUTTONS
    const cleanButtons = Array.isArray(buttons)
      ? buttons
          .filter(b => b.label && b.label.trim() !== "")
          .map((btn, index) => ({
            label: sanitizeHtml(btn.label),
            type: btn.type === "path" ? "path" : "section",
            section: btn.type === "section"
              ? sanitizeHtml(btn.section || "")
              : "",
            path: btn.type === "path"
              ? sanitizeHtml(btn.path || "")
              : "",
            isPrimary: Boolean(btn.isPrimary),
            isActive: Boolean(btn.isActive),
            order: index + 1, // 🔥 AUTO ORDER FIX
          }))
      : [];

    const navbar = await SuperAdminNavbar.findOneAndUpdate(
      {},
      { brandName, tagline, buttons: cleanButtons },
      { new: true, upsert: true }
    );

    res.json({
      success: true,
      message: "Navbar updated successfully",
      navbar,
    });
  } catch (err) {
    console.error("SAVE NAVBAR ERROR:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
