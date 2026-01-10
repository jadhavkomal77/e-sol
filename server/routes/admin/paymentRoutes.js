
import express from "express";
import {
  getMyPaymentSettings,
  upsertPaymentSettings,
  getPublicPaymentSettings,
} from "../../controllers/admin/paymentController.js";
import { verifyToken, adminOnly } from "../../middleware/authMiddleware.js";

const router = express.Router();

/* 🔐 ADMIN */
router.get("/", verifyToken, adminOnly, getMyPaymentSettings);
router.post("/", verifyToken, adminOnly, upsertPaymentSettings);

/* 🌍 PUBLIC */
router.get("/:slug", getPublicPaymentSettings);

export default router;
