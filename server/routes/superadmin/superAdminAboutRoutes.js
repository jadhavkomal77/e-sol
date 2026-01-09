import express from "express";
import {
  getSuperAboutPublic,
  getSuperAboutPrivate,
  saveSuperAbout,
  deleteSuperAbout,
} from "../../controllers/superadmin/superAdminAboutController.js";
import { verifyToken, superAdminOnly } from "../../middleware/authMiddleware.js";

const router = express.Router();

// 🌍 PUBLIC WEBSITE
router.get("/public", getSuperAboutPublic);

// 🔐 SUPERADMIN PANEL
router.use(verifyToken, superAdminOnly);
router.get("/", getSuperAboutPrivate);
router.post("/", saveSuperAbout);
router.delete("/", deleteSuperAbout);

export default router;
