



import Product from "../../models/admin/Product.js";
import Admin from "../../models/Admin.js";
import cloudinary from "../../utils/cloudinary.js";
import upload from "../../utils/upload.js";
import validator from "validator";
import sanitizeHtml from "sanitize-html";
import fs from "fs";


const sanitizeProductFields = (data = {}) => {
  const clean = {
    name: sanitizeHtml(data.name || ""),
    description: sanitizeHtml(data.description || ""),
    category: sanitizeHtml(data.category || ""),
    price: Number(data.price) > 0 ? Number(data.price) : 0,
  };

  if (typeof data.features === "string" && data.features.trim() !== "") {
    clean.features = data.features
      .split(",")
      .map((f) => sanitizeHtml(f.trim()))
      .filter(Boolean);
  }

  return clean;
};



export const addProduct = (req, res) => {
  upload.single("image")(req, res, async (err) => {
    try {
      if (err) {
        return res.status(400).json({ message: "Image upload failed" });
      }

      const adminId = req.user.id;
      const cleanData = sanitizeProductFields(req.body);

      let imageUrl = "";

      // ✅ upload image if present
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: `products/${adminId}`,
        });
        imageUrl = result.secure_url;
        fs.unlinkSync(req.file.path);
      }

      const product = await Product.create({
        ...cleanData,
        features: cleanData.features || [], // ensure array on create
        image: imageUrl,
        adminId,
        assignedTo: adminId,
        createdBy: adminId,
      });

      res.status(201).json({ success: true, product });
    } catch (error) {
      console.error("ADD PRODUCT ERROR:", error);
      res.status(500).json({ message: "Server Error" });
    }
  });
};

/* ======================================================
   ADMIN → GET OWN PRODUCTS
====================================================== */
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({
      adminId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json({ success: true, products });
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

/* ======================================================
   ADMIN → GET SINGLE PRODUCT
====================================================== */
export const getAdminSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!validator.isMongoId(id)) {
      return res.status(400).json({ message: "Invalid product id" });
    }

    const product = await Product.findOne({
      _id: id,
      adminId: req.user.id,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ success: true, product });
  } catch (error) {
    console.error("ADMIN SINGLE PRODUCT ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

/* ======================================================
   ADMIN → UPDATE PRODUCT
   ⚠️ image / features safe update
====================================================== */
export const updateProduct = (req, res) => {
  upload.single("image")(req, res, async (err) => {
    try {
      if (err) {
        return res.status(400).json({ message: "Image upload failed" });
      }

      const { id } = req.params;

      if (!validator.isMongoId(id)) {
        return res.status(400).json({ message: "Invalid product id" });
      }

      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (product.adminId.toString() !== req.user.id) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      const cleanData = sanitizeProductFields(req.body);

      // ✅ update image only if new image sent
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: `products/${req.user.id}`,
        });
        cleanData.image = result.secure_url;
        fs.unlinkSync(req.file.path);
      }

      // ✅ if features not sent, keep old
      if (!("features" in cleanData)) {
        delete cleanData.features;
      }

      Object.assign(product, cleanData);
      await product.save();

      res.json({ success: true, product });
    } catch (error) {
      console.error("UPDATE PRODUCT ERROR:", error);
      res.status(500).json({ message: "Server Error" });
    }
  });
};

/* ======================================================
   ADMIN → DELETE PRODUCT
====================================================== */
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!validator.isMongoId(id)) {
      return res.status(400).json({ message: "Invalid product id" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.adminId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await product.deleteOne();

    res.json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

/* ======================================================
   PUBLIC → GET PRODUCTS BY SLUG
====================================================== */
export const getPublicProductsBySlug = async (req, res) => {
  try {
    const slug = sanitizeHtml(req.params.slug?.toLowerCase());

    const admin = await Admin.findOne({
      websiteSlug: slug,
      isActive: true,
    }).select("_id");

    if (!admin) {
      return res.status(404).json({ message: "Website not found" });
    }

    const products = await Product.find({
      adminId: admin._id,
    }).select("-adminId -createdBy");

    res.json({ success: true, products });
  } catch (error) {
    console.error("PUBLIC PRODUCTS ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

/* ======================================================
   PUBLIC → GET SINGLE PRODUCT
====================================================== */
export const getSingleProductPublic = async (req, res) => {
  try {
    const { slug, id } = req.params;

    if (!validator.isMongoId(id)) {
      return res.status(400).json({ message: "Invalid product id" });
    }

    const admin = await Admin.findOne({
      websiteSlug: slug.toLowerCase(),
      isActive: true,
    }).select("_id");

    if (!admin) {
      return res.status(404).json({ message: "Website not found" });
    }

    const product = await Product.findOne({
      _id: id,
      adminId: admin._id,
    }).select("-adminId -createdBy");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ success: true, product });
  } catch (error) {
    console.error("PUBLIC SINGLE PRODUCT ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
