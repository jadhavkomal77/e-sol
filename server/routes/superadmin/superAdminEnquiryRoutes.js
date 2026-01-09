import express from "express";
import {
  createSuperAdminEnquiry,
  getSuperAdminEnquiries,
  updateSuperAdminEnquiryStatus,
  deleteSuperAdminEnquiry
} from "../../controllers/superadmin/superAdminEnquiryController.js";
import { verifyToken, superAdminOnly } from "../../middleware/authMiddleware.js";

const router = express.Router();

/* 🌍 PUBLIC */
router.post("/public", createSuperAdminEnquiry);

/* 🔐 SUPERADMIN PANEL */
router.use(verifyToken, superAdminOnly);
router.get("/", getSuperAdminEnquiries);
router.put("/:id/status", updateSuperAdminEnquiryStatus);
router.delete("/:id", deleteSuperAdminEnquiry);

export default router;
