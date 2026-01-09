
import SuperAdminHero from "../../models/superadmin/SuperAdminHero.js";
import sanitizeHtml from "sanitize-html";

/* Clean Data */
const cleanHeroData = (data) => ({
  badgeText: sanitizeHtml(data.badgeText || ""),
  title: sanitizeHtml(data.title || ""),
  highlightText: sanitizeHtml(data.highlightText || ""),
  description: sanitizeHtml(data.description || ""),

  buttonPrimary: sanitizeHtml(data.buttonPrimary || ""),
  buttonSecondary: sanitizeHtml(data.buttonSecondary || ""),

  phone: sanitizeHtml(data.phone || ""),
  email: sanitizeHtml(data.email || ""),
  location: sanitizeHtml(data.location || ""),

  stats: Array.isArray(data.stats)
    ? data.stats.map((s) => ({
        value: sanitizeHtml(s.value || ""),
        label: sanitizeHtml(s.label || ""),
      }))
    : [],
});

/* SAVE / UPDATE HERO */
export const saveSuperAdminHero = async (req, res) => {
  try {
    const updateData = cleanHeroData(req.body);

    const hero = await SuperAdminHero.findOneAndUpdate(
      {},
      updateData,
      { new: true, upsert: true }
    ).select("-__v");

    res.json({
      success: true,
      message: "Hero updated successfully",
      hero,
    });
  } catch (error) {
    console.error("SAVE SUPER HERO ERROR:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};


/* GET PUBLIC HERO */
export const getSuperAdminHero = async (req, res) => {
  try {
    const hero = await SuperAdminHero.findOne({})
      .select("-updatedAt -createdAt -__v");

    res.json({
      success: true,
      hero: hero || {},
    });
  } catch (error) {
    console.error("GET PUBLIC HERO ERROR:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
