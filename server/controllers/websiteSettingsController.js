import WebsiteSettings from "../models/WebsiteSettings.js";
import { v2 as cloudinary } from "cloudinary";
import validator from "validator";
import sanitizeHtml from "sanitize-html";

/* 🛡 Clean Settings */
const cleanSettingsData = (data) => ({
  title: sanitizeHtml(data.title || ""),
  subtitle: sanitizeHtml(data.subtitle || ""),
  primaryColor: sanitizeHtml(data.primaryColor || "#000000"),
  secondaryColor: sanitizeHtml(data.secondaryColor || "#ffffff"),
  buttonText: sanitizeHtml(data.buttonText || ""),
  buttonLink: validator.isURL(data.buttonLink || "", { require_protocol: true })
    ? sanitizeHtml(data.buttonLink)
    : "",
});

/* =====================================================
   1️⃣ GET WEBSITE SETTINGS
===================================================== */
export const getMyWebsiteSettings = async (req, res) => {
  try {
    const adminId = req.user.id;

    const settings = await WebsiteSettings.findOne({ adminId })
      .select("-adminId -createdAt -updatedAt");

    res.json({
      success: true,
      settings: settings || {},
    });
  } catch (err) {
    console.error("GET SETTINGS ERROR:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

/* =====================================================
   2️⃣ UPDATE WEBSITE SETTINGS (Cloudinary Only)
   Expect Base64 strings:
   logo, heroImage, favicon
===================================================== */
export const updateWebsiteSettings = async (req, res) => {
  try {
    const adminId = req.user.id;
    let updateData = cleanSettingsData(req.body);

    // ✅ Base64 → Cloudinary helper
    const uploadIfExists = async (base64, folder) => {
      if (!base64) return undefined;
      const uploaded = await cloudinary.uploader.upload(base64, {
        folder,
      });
      return uploaded.secure_url;
    };

    // ☁️ Optional images (Base64)
    if (req.body.logo) {
      updateData.logo = await uploadIfExists(
        req.body.logo,
        "website/logo"
      );
    }

    if (req.body.heroImage) {
      updateData.heroImage = await uploadIfExists(
        req.body.heroImage,
        "website/hero"
      );
    }

    if (req.body.favicon) {
      updateData.favicon = await uploadIfExists(
        req.body.favicon,
        "website/favicon"
      );
    }

    const settings = await WebsiteSettings.findOneAndUpdate(
      { adminId },
      {
        ...updateData,
        adminId, // enforce ownership
      },
      { new: true, upsert: true }
    );

    res.json({
      success: true,
      message: "Website settings updated successfully",
      settings,
    });
  } catch (err) {
    console.error("UPDATE SETTINGS ERROR:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};
