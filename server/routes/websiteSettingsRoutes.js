import express from "express";
import { verifyToken, adminOnly } from "../middleware/verifyToken.js";
import {
  getMyWebsiteSettings,
  updateWebsiteSettings,
} from "../controllers/websiteSettingsController.js";

import Upload from "../utils/uploadMultiple.js";

const router = express.Router();

// ADMIN PROTECTED ROUTES
router.use(verifyToken, adminOnly);

// GET website settings
router.get("/", getMyWebsiteSettings);

// UPDATE logo, heroImage, favicon
router.put(
  "/",
  Upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "heroImage", maxCount: 1 },
    { name: "favicon", maxCount: 1 }
  ]),
  updateWebsiteSettings
);

export default router;
