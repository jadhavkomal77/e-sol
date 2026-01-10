

import express from "express";
import {
  adminLogin,
  adminLogout,
  getAdminProfile,
  updateAdminProfile,
  changeAdminPassword,
  getMyProducts,
  updateMyProduct,
  deleteMyProduct,
  getAdminStats,
} from "../controllers/adminController.js";

import { adminOnly, verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

/* PUBLIC */
router.post("/login", adminLogin);

/* PROTECTED */
router.post("/logout", verifyToken, adminOnly, adminLogout);
router.get("/profile", verifyToken, adminOnly, getAdminProfile);

router.put("/update-profile", verifyToken, adminOnly, updateAdminProfile);
router.put("/change-password", verifyToken, adminOnly, changeAdminPassword);

router.get("/my-products", verifyToken, adminOnly, getMyProducts);
router.put("/update-product/:id", verifyToken, adminOnly, updateMyProduct);
router.delete("/delete-product/:id", verifyToken, adminOnly, deleteMyProduct);

router.get("/stats", verifyToken, adminOnly, getAdminStats);

export default router;
