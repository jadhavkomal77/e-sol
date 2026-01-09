import express from "express";


import { verifyToken, superAdminOnly } from "../../middleware/authMiddleware.js";
import { getSuperAdminFooter, updateSuperAdminFooter } from "../../controllers/superadmin/superAdminFooterController.js";

const router = express.Router();

/* ================================
   SUPERADMIN PANEL ROUTES (Secure)
================================ */
router.get("/", verifyToken, superAdminOnly, getSuperAdminFooter);
router.put("/", verifyToken, superAdminOnly, updateSuperAdminFooter);

/* ================================
   PUBLIC MAIN WEBSITE ROUTE
================================ */
router.get("/public", getSuperAdminFooter);

export default router;
