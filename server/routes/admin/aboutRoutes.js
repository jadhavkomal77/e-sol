import express from "express";
import { verifyToken, adminOnly } from "../../middleware/authMiddleware.js";
import { attachAdminId } from "../../middleware/assignId.js";
import {
  getAbout,
  updateAbout,
} from "../../controllers/admin/aboutController.js";

const router = express.Router();

/* ================= ADMIN PANEL ================= */

router.get("/", verifyToken, adminOnly, getAbout);
router.put("/", verifyToken, adminOnly, updateAbout);

/* ================= PUBLIC WEBSITE ================= */

router.get("/public/:slug", attachAdminId, getAbout);

export default router;
