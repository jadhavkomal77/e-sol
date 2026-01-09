import express from "express";
import {
  createEnquiry,
  getAllEnquiries,
  getMyEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
} from "../../controllers/admin/enquiryController.js";

import { verifyToken, adminOnly } from "../../middleware/authMiddleware.js";

const router = express.Router();

// USER
router.post("/", createEnquiry);
router.get("/my", verifyToken, getMyEnquiries);

// ADMIN
router.get("/", verifyToken, adminOnly, getAllEnquiries);
router.put("/:id/status", verifyToken, adminOnly, updateEnquiryStatus);
router.delete("/:id", verifyToken, adminOnly, deleteEnquiry);

export default router;
