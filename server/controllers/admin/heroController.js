

import Admin from "../../models/Admin.js";
import Hero from "../../models/admin/Hero.js";
import validator from "validator";
import sanitizeHtml from "sanitize-html";

/* ======================================================
   ADMIN → GET OWN HERO (Protected)
====================================================== */
export const getAdminHero = async (req, res) => {
  try {
    const hero = await Hero.findOne({ adminId: req.user.id });
    res.json({ success: true, hero: hero || null });
  } catch (error) {
    console.error("GET ADMIN HERO:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};


/* ======================================================
   ADMIN → UPDATE HERO (Protected)
====================================================== */
export const updateHero = async (req, res) => {
  try {
    const adminId = req.user.id;

    const {
      title,
      subtitle,
      buttonText,
      buttonLink,
      image,
    } = req.body;

    // 🛡 Sanitization (XSS Protection)
   const cleanData = {
  badgeText: sanitizeHtml(req.body.badgeText || ""),
  title: sanitizeHtml(req.body.title || ""),
  highlightText: sanitizeHtml(req.body.highlightText || ""),
  description: sanitizeHtml(req.body.description || ""),

  buttonPrimary: sanitizeHtml(req.body.buttonPrimary || ""),
  buttonSecondary: sanitizeHtml(req.body.buttonSecondary || ""),

  phone: sanitizeHtml(req.body.phone || ""),
  email: sanitizeHtml(req.body.email || ""),
  location: sanitizeHtml(req.body.location || ""),

  stats: Array.isArray(req.body.stats)
    ? req.body.stats.map((s) => ({
        label: sanitizeHtml(s.label || ""),
        value: sanitizeHtml(s.value || ""),
      }))
    : [],
};

  const hero = await Hero.findOneAndUpdate(
  { adminId },
  cleanData,
  { new: true, upsert: true }
);


    res.json({
      success: true,
      message: "Hero updated successfully",
      hero,
    });

  } catch (error) {
    console.error("UPDATE HERO:", error.message);
    res.status(500).json({ message: "Failed to update hero" });
  }
};


/* ======================================================
   ADMIN → DELETE HERO (Protected)
====================================================== */
export const deleteHero = async (req, res) => {
  try {
    const adminId = req.user.id;

    await Hero.findOneAndDelete({ adminId });

    res.json({
      success: true,
      message: "Hero deleted successfully",
    });
  } catch (error) {
    console.error("DELETE HERO:", error.message);
    res.status(500).json({ message: "Failed to delete hero" });
  }
};


/* ======================================================
   PUBLIC → GET HERO BY SLUG
====================================================== */
export const getPublicHero = async (req, res) => {
  try {
    const { slug } = req.params;

    const admin = await Admin.findOne({
      websiteSlug: slug.toLowerCase().trim(),
      isActive: true,
    }).select("_id");

    if (!admin) {
      return res.status(404).json({ message: "Website not found" });
    }

    const hero = await Hero.findOne({ adminId: admin._id });

    res.status(200).json({
      success: true,
      hero: hero || null,
    });

  } catch (error) {
    console.error("GET PUBLIC HERO:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
