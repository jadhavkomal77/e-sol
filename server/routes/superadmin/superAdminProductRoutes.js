import express from "express";
import { uploadSingle } from "../../utils/upload.js"; // <-- FIXED IMPORT

import {
  addSuperProduct,
  getSuperProductsPrivate,
  getSuperProductsPublic,
  getSuperSingleProductPublic,
  updateSuperProduct,
  deleteSuperProduct,
} from "../../controllers/superadmin/superAdminProductController.js";

import { verifyToken, superAdminOnly } from "../../middleware/authMiddleware.js";

const router = express.Router();

/* 🌍 PUBLIC ROUTES */
router.get("/public", getSuperProductsPublic);
router.get("/public/:id", getSuperSingleProductPublic);

/* 🔐 SUPERADMIN DASHBOARD ROUTES */
router.use(verifyToken, superAdminOnly);

router.get("/", getSuperProductsPrivate);
router.post("/", uploadSingle("image"), addSuperProduct);
router.put("/:id", uploadSingle("image"), updateSuperProduct);
router.delete("/:id", deleteSuperProduct);

export default router;
