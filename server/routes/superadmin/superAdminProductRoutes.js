
import express from "express";
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
router.post("/", addSuperProduct);        
router.put("/:id", updateSuperProduct);   
router.delete("/:id", deleteSuperProduct);

export default router;
