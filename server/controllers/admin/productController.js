
import Product from "../../models/admin/Product.js";
import Admin from "../../models/Admin.js";
import { uploadToCloudinary } from "../../utils/cloudinaryUpload.js";
import validator from "validator";
import sanitizeHtml from "sanitize-html";

const sanitizeProductFields = (data) => ({
  name: sanitizeHtml(data.name || ""),
  description: sanitizeHtml(data.description || ""),
  category: sanitizeHtml(data.category || ""),
  price: Number(data.price) > 0 ? Number(data.price) : 0,

  features: typeof data.features === "string"
    ? data.features
        .split(",")
        .map((f) => sanitizeHtml(f.trim()))
        .filter(Boolean)
    : [],
});


/* ======================================================
   ADMIN → ADD PRODUCT (SECURE)
====================================================== */
export const addProduct = async (req, res) => {
  try {
    const adminId = req.user.id;
    const cleanData = sanitizeProductFields(req.body);

    let imageUrl = "";
    if (req.file && req.file.buffer) {
      const upload = await uploadToCloudinary(
        req.file.buffer,
        "products",
        req.file.originalname
      );
      imageUrl = upload.secure_url;
    }

    const product = await Product.create({
      ...cleanData,
      image: imageUrl,

      // ✅ MULTI-ADMIN SAFE
      adminId: adminId,       // website owner
      assignedTo: adminId,    // product owner
      createdBy: adminId,     // audit
    });

    res.status(201).json({ success: true, product });
  } catch (err) {
    console.error("ADD PRODUCT ERROR:", err);
    res.status(500).json({ message: err.message });
  }
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
  } catch (err) {
    console.error("GET PRODUCTS:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};


/* ======================================================
   PUBLIC → GET PRODUCTS USING SLUG
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

    const products = await Product.find({ adminId: admin._id })
      .select("-assignedTo -createdBy -adminId");

    res.json({ success: true, products });
  } catch (err) {
    console.error("PUBLIC PRODUCTS ERROR:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};


/* ======================================================
   PUBLIC → SINGLE PRODUCT BY SLUG + ID
====================================================== */
export const getSingleProductPublic = async (req, res) => {
  try {
    const slug = sanitizeHtml(req.params.slug?.toLowerCase());
    const { id } = req.params;

    if (!validator.isMongoId(id))
      return res.status(400).json({ message: "Invalid product id" });

    const admin = await Admin.findOne({
      websiteSlug: slug,
      isActive: true,
    }).select("_id");

    if (!admin) {
      return res.status(404).json({ message: "Website not found" });
    }

    const product = await Product.findOne({
      _id: id,
      adminId: admin._id,
    }).select("-assignedTo -createdBy");

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    res.json({ success: true, product });
  } catch (err) {
    console.error("PUBLIC PRODUCT ERROR:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};


/* ======================================================
   ADMIN → UPDATE PRODUCT (SAFE)
====================================================== */
export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;

    if (!validator.isMongoId(id))
      return res.status(400).json({ message: "Invalid product id" });

    const product = await Product.findById(id);

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    if (product.adminId.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    const cleanData = sanitizeProductFields(req.body);

    if (req.file && req.file.buffer) {
      const upload = await uploadToCloudinary(
        req.file.buffer,
        "products",
        req.file.originalname
      );
      cleanData.image = upload.secure_url;
    }

    Object.assign(product, cleanData);
    await product.save();

    res.json({ success: true, product });
  } catch (err) {
    console.error("UPDATE PRODUCT ERROR:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};


/* ======================================================
   ADMIN → DELETE PRODUCT
====================================================== */
export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    if (!validator.isMongoId(id))
      return res.status(400).json({ message: "Invalid product id" });

    const product = await Product.findById(id);

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    if (product.adminId.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    await product.deleteOne();

    res.json({ success: true, message: "Product deleted" });
  } catch (err) {
    console.error("DELETE PRODUCT ERROR:", err.message);
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
      adminId: req.user.id, // 🔐 security
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ success: true, product });
  } catch (err) {
    console.error("ADMIN SINGLE PRODUCT ERROR:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};
