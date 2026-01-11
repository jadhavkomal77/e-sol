import express from "express";
import { verifyToken, superAdminOnly } from "../../middleware/authMiddleware.js";
import { createOrder, getAllPayments, getPublicSuperAdminPayment, upsertSuperAdminPaymentSettings, verifyPayment } from "../../controllers/superadmin/superAdminPaymentSettingsController.js";

const router = express.Router();

/* 🌍 PUBLIC (Main Website) */
router.get("/public", getPublicSuperAdminPayment);
router.post("/create-order", createOrder);
router.post("/verify", verifyPayment);

/* 🔐 SUPERADMIN */
router.use(verifyToken, superAdminOnly);

router.post("/", upsertSuperAdminPaymentSettings); // create/update settings
router.get("/all", getAllPayments);               // all transactions

export default router;
