

import SuperAdminProduct from "../../models/superadmin/SuperAdminProduct.js";
import { uploadToCloudinary } from "../../utils/cloudinaryUpload.js";
import sanitizeHtml from "sanitize-html";
import validator from "validator";

/* 🛡 Clean Product Fields */
const sanitizeProduct = (data) => ({
  name: sanitizeHtml(data.name || "").trim(),
  description: sanitizeHtml(data.description || "").trim(),
  category: sanitizeHtml(data.category || "").trim(),
  price: Number(data.price) > 0 ? Number(data.price) : 0,
  status: data.status === undefined ? true : data.status,

  features: Array.isArray(data.features)
    ? data.features.map(f => sanitizeHtml(f))
    : typeof data.features === "string"
      ? data.features.split(",").map(f => sanitizeHtml(f.trim()))
      : [],
});

/* ======================================================
   ➕ ADD PRODUCT (SuperAdmin)
====================================================== */
export const addSuperProduct = async (req, res) => {
  try {
    const cleanData = sanitizeProduct(req.body);
    cleanData.superAdminId = req.user.id;
    cleanData.createdBy = req.user.id;

    // 📷 Image Upload (Optional)
    if (req.file && req.file.buffer) {
      const uploaded = await uploadToCloudinary(
        req.file.buffer,
        "superadmin-products",
        req.file.originalname
      );
      cleanData.image = uploaded.secure_url;
    }

    const product = await SuperAdminProduct.create(cleanData);

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product
    });

  } catch (err) {
    console.error("ADD PRODUCT ERROR =>", err);
    res.status(500).json({ message: "Server Error" });
  }
};

/* ======================================================
   🔐 PRIVATE — Dashboard List
====================================================== */
export const getSuperProductsPrivate = async (req, res) => {
  try {
    const products = await SuperAdminProduct.find({
      superAdminId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json({ success: true, products });

  } catch (err) {
    console.error("PRIVATE PRODUCTS ERROR:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

/* ======================================================
   🌍 PUBLIC → Active Products
====================================================== */
export const getSuperProductsPublic = async (req, res) => {
  try {
    const products = await SuperAdminProduct.find({
      status: true,
    }).select("name price description image category features");

    res.json({ success: true, products });

  } catch (err) {
    console.error("PUBLIC PRODUCTS ERROR:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

/* ======================================================
   ✏ UPDATE PRODUCT
====================================================== */
export const updateSuperProduct = async (req, res) => {
  try {
    const id = req.params.id;
    if (!validator.isMongoId(id))
      return res.status(400).json({ message: "Invalid Product ID" });

    const product = await SuperAdminProduct.findById(id);
    if (!product)
      return res.status(404).json({ message: "Product Not Found" });

    if (product.superAdminId.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    const cleanData = sanitizeProduct(req.body);

    if (req.file && req.file.buffer) {
      const uploaded = await uploadToCloudinary(
        req.file.buffer,
        "superadmin-products",
        req.file.originalname
      );
      cleanData.image = uploaded.secure_url;
    }

    Object.assign(product, cleanData);
    await product.save();

    res.json({
      success: true,
      message: "Product updated successfully",
      product,
    });

  } catch (err) {
    console.error("UPDATE PRODUCT ERROR:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

/* ======================================================
   🗑 DELETE PRODUCT
====================================================== */
export const deleteSuperProduct = async (req, res) => {
  try {
    const id = req.params.id;
    if (!validator.isMongoId(id))
      return res.status(400).json({ message: "Invalid Product ID" });

    const product = await SuperAdminProduct.findById(id);
    if (!product)
      return res.status(404).json({ message: "Product Not Found" });

    if (product.superAdminId.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    await product.deleteOne();

    res.json({
      success: true,
      message: "Product deleted successfully"
    });

  } catch (err) {
    console.error("DELETE PRODUCT ERROR:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

/* ======================================================
   🌍 PUBLIC — Single Product
====================================================== */
export const getSuperSingleProductPublic = async (req, res) => {
  try {
    const id = req.params.id;

    if (!validator.isMongoId(id))
      return res.status(400).json({ message: "Invalid Product ID" });

    const product = await SuperAdminProduct.findById(id)
      .select("name price description image category features status");

    if (!product || product.status === false)
      return res.status(404).json({ message: "Product Not Found" });

    res.json({ success: true, product });

  } catch (err) {
    console.error("PUBLIC ONE PRODUCT ERROR:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
