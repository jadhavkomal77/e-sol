
import express from "express";
import {
  createContact,
  getAllContacts,
  deleteContact,
} from "../controllers/contactController.js";
import { adminOnly, verifyToken } from "../middleware/authMiddleware.js";
import { attachAdminId } from "../middleware/assignId.js";


const router = express.Router();

/* ================= PUBLIC ================= */
// ⭐ slug → attachAdminId → admin resolved
router.post(
  "/public/:slug",
  attachAdminId,
  createContact
);

/* ================= ADMIN ================= */
router.get("/", verifyToken, adminOnly, getAllContacts);
router.delete("/:id", verifyToken, adminOnly, deleteContact);

export default router;
