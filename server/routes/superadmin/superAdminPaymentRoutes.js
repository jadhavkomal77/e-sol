// routes/paymentRoutes.js
import express from "express";

import { verifyToken, superAdminOnly } from "../../middleware/authMiddleware.js";
import { createOrder, getAllPayments, verifyPayment } from "../../controllers/superadmin/superadminpaymentController.js";



const router = express.Router();

router.post("/create-order", createOrder);
router.post("/verify", verifyPayment);
router.get("/all", verifyToken, superAdminOnly, getAllPayments);

export default router;
