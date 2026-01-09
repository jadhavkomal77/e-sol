// routes/superAdminNavbarRoutes.js
import express from "express";
import { getPublicNavbar, saveNavbar } from "../../controllers/superadmin/superAdminNavbarController.js";
import { superAdminOnly, verifyToken } from "../../middleware/authMiddleware.js";

const router = express.Router();

// 🌍 PUBLIC (No slug)
router.get("/public", getPublicNavbar);

// 🛡️ SUPER ADMIN secured
router.post("/", verifyToken, superAdminOnly, saveNavbar);

export default router;
