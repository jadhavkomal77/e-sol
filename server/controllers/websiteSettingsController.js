import WebsiteSettings from "../models/WebsiteSettings.js";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";
import validator from "validator";
import sanitizeHtml from "sanitize-html";

/* 🛡 Helper – Clean Settings */
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
   1️⃣ GET WEBSITE SETTINGS (Admin)
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
   2️⃣ UPDATE WEBSITE SETTINGS (SECURE)
===================================================== */
export const updateWebsiteSettings = async (req, res) => {
  try {
    const adminId = req.user.id;
    let updateData = cleanSettingsData(req.body);

    const uploadIfExists = async (file) => {
      if (file && file.buffer) {
        const uploaded = await uploadToCloudinary(
          file.buffer,
          "website",
          file.originalname
        );
        return uploaded.secure_url;
      }
      return undefined;
    };

    // ☁️ File uploads (optional)
    if (req.files?.logo?.[0]) {
      updateData.logo = await uploadIfExists(req.files.logo[0]);
    }
    if (req.files?.heroImage?.[0]) {
      updateData.heroImage = await uploadIfExists(req.files.heroImage[0]);
    }
    if (req.files?.favicon?.[0]) {
      updateData.favicon = await uploadIfExists(req.files.favicon[0]);
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
