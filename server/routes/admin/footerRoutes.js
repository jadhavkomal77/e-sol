
import express from "express";
import { adminOnly, verifyToken } from "../../middleware/authMiddleware.js";
import { getFooter, updateFooter } from "../../controllers/admin/footerController.js";
import { attachAdminId } from "../../middleware/assignId.js";

const router = express.Router();

/* 🔐 ADMIN PANEL */
router.get("/", verifyToken, adminOnly, getFooter);
router.put("/", verifyToken, adminOnly, updateFooter);

/* 🌍 PUBLIC WEBSITE */
router.get("/public/:slug", attachAdminId, getFooter);

export default router;
