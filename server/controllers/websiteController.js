
import Admin from "../models/Admin.js";
import Product from "../models/Product.js";
import Service from "../models/Service.js";
import WebsiteSettings from "../models/WebsiteSettings.js";
import sanitizeHtml from "sanitize-html";

/* ======================================================
   PUBLIC → Full Website Data by Slug (Safe)
====================================================== */
export const getWebsiteData = async (req, res) => {
  try {
    const slug = sanitizeHtml(req.params.slug?.toLowerCase().trim());

    // 🔐 Validate request
    if (!slug) {
      return res.status(400).json({ message: "Invalid request" });
    }

    // 🔎 Find Active Admin Website
    const admin = await Admin.findOne({
      websiteSlug: slug,
      isActive: true,
    }).select("_id name");

    if (!admin) {
      return res.status(404).json({ message: "Website not found" });
    }

    const adminId = admin._id;

    const [settings, products, services] = await Promise.all([
      WebsiteSettings.findOne({ adminId }).select("-adminId -createdAt -updatedAt"),
      Product.find({ adminId })
        .select("name price description category image features")
        .sort({ createdAt: -1 }),
      Service.find({ adminId })
        .select("title description price duration category image")
        .sort({ createdAt: -1 }),
    ]);

    return res.json({
      success: true,
      admin: {
        name: admin.name, // Only safe public info
      },
      settings: settings || {},
      products,
      services,
    });

  } catch (err) {
    console.error("WEBSITE DATA ERROR:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};
