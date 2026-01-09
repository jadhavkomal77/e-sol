import express from "express";
import { adminOnly, verifyToken } from "../../middleware/authMiddleware.js";
import { attachAdminId } from "../../middleware/assignId.js";
import { getPublicNavbar, saveNavbar } from "../../controllers/admin/navbarController.js";

const router = express.Router();

// 🌍 PUBLIC
router.get("/public/:slug", attachAdminId, getPublicNavbar);
// 🛡️ ADMIN
router.post("/", verifyToken, adminOnly, saveNavbar);

export default router;
