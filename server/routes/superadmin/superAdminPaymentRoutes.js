import express from "express";
import { verifyToken, superAdminOnly } from "../../middleware/authMiddleware.js";
import {
  getSuperAdminPayment,
  upsertSuperAdminPayment,
  getAllPayments,
  getPublicSuperAdminPayment,
  createOrder,
  verifyPayment,
} from "../../controllers/superadmin/superadminpaymentController.js";

const router = express.Router();

/* 🌍 PUBLIC */
router.get("/public", getPublicSuperAdminPayment);
router.post("/create-order", createOrder);
router.post("/verify", verifyPayment);

/* 🔐 SUPERADMIN */
router.use(verifyToken, superAdminOnly);

// ✅ THIS IS REQUIRED
router.get("/", getSuperAdminPayment);

router.post("/", upsertSuperAdminPayment);
router.get("/all", getAllPayments);

export default router;
