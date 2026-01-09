import express from "express";
import {
  saveSuperAdminHero,
  getSuperAdminHero,
} from "../../controllers/superadmin/superAdminHeroController.js";
import { superAdminOnly, verifyToken } from "../../middleware/authMiddleware.js";

const router = express.Router();

// 🌍 Public Website Hero Data ➜ No Token Required
router.get("/public", getSuperAdminHero);

// ============================================
// 🔐 All Below Routes Are Protected
// ============================================
router.use(verifyToken, superAdminOnly);

router.get("/", getSuperAdminHero);
router.put("/", saveSuperAdminHero);

export default router;
