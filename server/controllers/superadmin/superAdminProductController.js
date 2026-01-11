
// import SuperAdminProduct from "../../models/superadmin/SuperAdminProduct.js";
// import { v2 as cloudinary } from "cloudinary";
// import sanitizeHtml from "sanitize-html";
// import validator from "validator";

// /* 🛡 Sanitize */
// const sanitizeProduct = (data) => ({
//   name: sanitizeHtml(data.name || "").trim(),
//   description: sanitizeHtml(data.description || "").trim(),
//   category: sanitizeHtml(data.category || "").trim(),
//   price: Number(data.price) > 0 ? Number(data.price) : 0,
//   status: data.status === undefined ? true : data.status,
//   features: Array.isArray(data.features)
//     ? data.features.map((f) => sanitizeHtml(f))
//     : typeof data.features === "string"
//       ? data.features.split(",").map((f) => sanitizeHtml(f.trim()))
//       : [],
// });

// /* ➕ ADD PRODUCT */
// export const addSuperProduct = async (req, res) => {
//   try {
//     const cleanData = sanitizeProduct(req.body);
//     cleanData.superAdminId = req.user.id;
//     cleanData.createdBy = req.user.id;

//     // ✅ Base64 → Cloudinary
//     if (req.body.image) {
//       const upload = await cloudinary.uploader.upload(req.body.image, {
//         folder: "superadmin-products",
//       });
//       cleanData.image = upload.secure_url;
//     }

//     const product = await SuperAdminProduct.create(cleanData);

//     res.status(201).json({
//       success: true,
//       message: "Product added successfully",
//       product,
//     });
//   } catch (err) {
//     console.error("ADD PRODUCT ERROR:", err);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// /* 🔐 PRIVATE LIST */
// export const getSuperProductsPrivate = async (req, res) => {
//   try {
//     const products = await SuperAdminProduct.find({
//       superAdminId: req.user.id,
//     }).sort({ createdAt: -1 });

//     res.json({ success: true, products });
//   } catch (err) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// /* 🌍 PUBLIC LIST */
// export const getSuperProductsPublic = async (req, res) => {
//   try {
//     const products = await SuperAdminProduct.find({ status: true })
//       .select("name price description image category features");

//     res.json({ success: true, products });
//   } catch (err) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// /* ✏ UPDATE PRODUCT */
// export const updateSuperProduct = async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!validator.isMongoId(id))
//       return res.status(400).json({ message: "Invalid Product ID" });

//     const product = await SuperAdminProduct.findById(id);
//     if (!product)
//       return res.status(404).json({ message: "Product Not Found" });

//     if (product.superAdminId.toString() !== req.user.id)
//       return res.status(403).json({ message: "Unauthorized" });

//     const cleanData = sanitizeProduct(req.body);

//     if (req.body.image) {
//       const upload = await cloudinary.uploader.upload(req.body.image, {
//         folder: "superadmin-products",
//       });
//       cleanData.image = upload.secure_url;
//     }

//     Object.assign(product, cleanData);
//     await product.save();

//     res.json({
//       success: true,
//       message: "Product updated successfully",
//       product,
//     });
//   } catch (err) {
//     console.error("UPDATE PRODUCT ERROR:", err);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// /* 🗑 DELETE PRODUCT */
// export const deleteSuperProduct = async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!validator.isMongoId(id))
//       return res.status(400).json({ message: "Invalid Product ID" });

//     const product = await SuperAdminProduct.findById(id);
//     if (!product)
//       return res.status(404).json({ message: "Product Not Found" });

//     if (product.superAdminId.toString() !== req.user.id)
//       return res.status(403).json({ message: "Unauthorized" });

//     await product.deleteOne();

//     res.json({ success: true, message: "Product deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// /* 🌍 PUBLIC SINGLE */
// export const getSuperSingleProductPublic = async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!validator.isMongoId(id))
//       return res.status(400).json({ message: "Invalid Product ID" });

//     const product = await SuperAdminProduct.findById(id)
//       .select("name price description image category features status");

//     if (!product || product.status === false)
//       return res.status(404).json({ message: "Product Not Found" });

//     res.json({ success: true, product });
//   } catch (err) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };




import SuperAdminProduct from "../../models/superadmin/SuperAdminProduct.js";
import cloudinary from "../../utils/cloudinary.js";
import upload from "../../utils/upload.js";
import sanitizeHtml from "sanitize-html";
import validator from "validator";
import fs from "fs";


const sanitizeProductCreate = (data = {}) => {
  const clean = {
    name: sanitizeHtml(data.name || "").trim(),
    description: sanitizeHtml(data.description || "").trim(),
    category: sanitizeHtml(data.category || "").trim(),
    price: Number(data.price) > 0 ? Number(data.price) : 0,
    status: data.status === undefined ? true : data.status,
  };

  if (typeof data.features === "string" && data.features.trim() !== "") {
    clean.features = data.features
      .split(",")
      .map((f) => sanitizeHtml(f.trim()))
      .filter(Boolean);
  } else {
    clean.features = [];
  }

  return clean;
};


const sanitizeProductUpdate = (data = {}) => {
  const clean = {};

  if (data.name !== undefined)
    clean.name = sanitizeHtml(data.name).trim();

  if (data.description !== undefined)
    clean.description = sanitizeHtml(data.description).trim();

  if (data.category !== undefined)
    clean.category = sanitizeHtml(data.category).trim();

  if (data.price !== undefined)
    clean.price = Number(data.price) > 0 ? Number(data.price) : 0;

  if (data.status !== undefined)
    clean.status = data.status;

  if (typeof data.features === "string") {
    clean.features = data.features
      .split(",")
      .map((f) => sanitizeHtml(f.trim()))
      .filter(Boolean);
  }

  return clean;
};

/* =====================================================
   ➕ ADD SUPERADMIN PRODUCT
===================================================== */
export const addSuperProduct = (req, res) => {
  upload.single("image")(req, res, async (err) => {
    try {
      if (err) {
        return res.status(400).json({ message: "Image upload failed" });
      }

      const cleanData = sanitizeProductCreate(req.body);

      let imageUrl = "";
      if (req.file) {
        const uploadRes = await cloudinary.uploader.upload(req.file.path, {
          folder: `superadmin/products/${req.user.id}`,
        });
        imageUrl = uploadRes.secure_url;
        fs.unlinkSync(req.file.path);
      }

      const product = await SuperAdminProduct.create({
        ...cleanData,
        image: imageUrl,
        superAdminId: req.user.id,
        createdBy: req.user.id,
      });

      res.status(201).json({
        success: true,
        message: "Product added successfully",
        product,
      });
    } catch (error) {
      console.error("ADD SUPER PRODUCT ERROR:", error);
      res.status(500).json({ message: "Server Error" });
    }
  });
};

/* =====================================================
   🔐 PRIVATE LIST (SUPERADMIN)
===================================================== */
export const getSuperProductsPrivate = async (req, res) => {
  try {
    const products = await SuperAdminProduct.find({
      superAdminId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

/* =====================================================
   🌍 PUBLIC LIST
===================================================== */
export const getSuperProductsPublic = async (req, res) => {
  try {
    const products = await SuperAdminProduct.find({ status: true }).select(
      "name price description image category features"
    );

    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

/* =====================================================
   ✏ UPDATE SUPERADMIN PRODUCT (FIXED)
===================================================== */
export const updateSuperProduct = (req, res) => {
  upload.single("image")(req, res, async (err) => {
    try {
      if (err) {
        return res.status(400).json({ message: "Image upload failed" });
      }

      const { id } = req.params;

      if (!validator.isMongoId(id)) {
        return res.status(400).json({ message: "Invalid Product ID" });
      }

      const product = await SuperAdminProduct.findById(id);
      if (!product) {
        return res.status(404).json({ message: "Product Not Found" });
      }

      if (product.superAdminId.toString() !== req.user.id) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      const cleanData = sanitizeProductUpdate(req.body);

      if (req.file) {
        const uploadRes = await cloudinary.uploader.upload(req.file.path, {
          folder: `superadmin/products/${req.user.id}`,
        });
        cleanData.image = uploadRes.secure_url;
        fs.unlinkSync(req.file.path);
      }

      Object.assign(product, cleanData);
      await product.save();

      res.json({
        success: true,
        message: "Product updated successfully",
        product,
      });
    } catch (error) {
      console.error("UPDATE SUPER PRODUCT ERROR:", error);
      res.status(500).json({ message: "Server Error" });
    }
  });
};

/* =====================================================
   🗑 DELETE SUPERADMIN PRODUCT
===================================================== */
export const deleteSuperProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!validator.isMongoId(id)) {
      return res.status(400).json({ message: "Invalid Product ID" });
    }

    const product = await SuperAdminProduct.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    if (product.superAdminId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await product.deleteOne();

    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

/* =====================================================
   🌍 PUBLIC SINGLE PRODUCT
===================================================== */
export const getSuperSingleProductPublic = async (req, res) => {
  try {
    const { id } = req.params;

    if (!validator.isMongoId(id)) {
      return res.status(400).json({ message: "Invalid Product ID" });
    }

    const product = await SuperAdminProduct.findById(id).select(
      "name price description image category features status"
    );

    if (!product || product.status === false) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
