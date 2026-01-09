import express from "express";
import {
  createFeedback,
  getPublicFeedback,
  getSuperAdminFeedback,
  updateFeedbackStatus,
  deleteFeedback,
} from "../../controllers/superadmin/superAdminFeedbackController.js";
import { verifyToken, superAdminOnly } from "../../middleware/authMiddleware.js";

const router = express.Router();

/* 🌍 PUBLIC */
router.post("/public", createFeedback);
router.get("/public", getPublicFeedback);

/* 🔐 SUPERADMIN DASHBOARD */
router.use(verifyToken, superAdminOnly);
router.get("/", getSuperAdminFeedback);
router.put("/:id/status", updateFeedbackStatus);
router.delete("/:id", deleteFeedback);

export default router;
