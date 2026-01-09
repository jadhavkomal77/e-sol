

import express from "express";
import {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getSingleProductPublic,
  getPublicProductsBySlug,
  getAdminSingleProduct
} from "../../controllers/admin/productController.js";

import { verifyToken, adminOnly } from "../../middleware/authMiddleware.js";
import { uploadSingle } from "../../utils/upload.js";


const router = express.Router();

router.get("/public/:slug", getPublicProductsBySlug); 
router.get("/public/:slug/:id", getSingleProductPublic); 

router.post("/add",verifyToken,adminOnly, uploadSingle("image"), addProduct)

router.get("/all", verifyToken, adminOnly, getProducts);
router.get("/:id", verifyToken,adminOnly, getAdminSingleProduct);

router.put("/update/:id",verifyToken,adminOnly,uploadSingle("image"),updateProduct);

router.delete( "/delete/:id",verifyToken,adminOnly,deleteProduct);

export default router;
