import express from "express";


import { verifyToken, adminOnly } from "../../middleware/authMiddleware.js";
import { attachAdminId } from "../../middleware/assignId.js";
import { createFeedback, createPublicFeedback, deleteFeedback, getAllFeedbacks, getMyFeedbacks, updateFeedbackStatus } from "../../controllers/admin/feedbackController.js";

const router = express.Router();
// 🌍 PUBLIC
router.post(
  "/public/:slug",
  attachAdminId,
  createPublicFeedback
);

// 👤 USER
router.post("/", verifyToken, createFeedback);
router.get("/my", verifyToken, getMyFeedbacks);

// 🛡️ ADMIN
router.get("/", verifyToken, adminOnly, getAllFeedbacks);
router.delete("/:id", verifyToken, adminOnly, deleteFeedback);

router.patch(
  "/:id/status",
  verifyToken,
  adminOnly,
  updateFeedbackStatus
);

export default router;
