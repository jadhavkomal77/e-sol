import express from "express";
import {
  getPublicPayment,
  updatePaymentSettings,
} from "../../controllers/superadmin/superAdminPaymentSettingsController.js";
import { verifyToken, superAdminOnly } from "../../middleware/authMiddleware.js";

const router = express.Router();

/* PUBLIC */
router.get("/public", getPublicPayment);

/* SUPERADMIN */
router.put("/", verifyToken, superAdminOnly, updatePaymentSettings);

export default router;
