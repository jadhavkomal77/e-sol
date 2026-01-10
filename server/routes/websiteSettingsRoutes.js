import express from "express";
import { verifyToken, adminOnly } from "../middleware/verifyToken.js";
import {
  getMyWebsiteSettings,
  updateWebsiteSettings,
} from "../controllers/websiteSettingsController.js";

const router = express.Router();

// 🔐 ADMIN PROTECTED ROUTES
router.use(verifyToken, adminOnly);

// GET website settings
router.get("/", getMyWebsiteSettings);

router.put("/", updateWebsiteSettings);

export default router;
