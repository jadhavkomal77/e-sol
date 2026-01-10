
/* ================= MODELS ================= */
import Admin from "../models/Admin.js";
import Product from "../models/admin/Product.js";
import Service from "../models/admin/Service.js";
import Enquiry from "../models/admin/Enquiry.js";
import Feedback from "../models/admin/Feedback.js";
import Contact from "../models/Contact.js";
import BlacklistedToken from "../models/BlacklistedToken.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import upload from "../utils/upload.js";
import cloudinary from "../utils/cloudinary.js";

const JWT_SECRET = process.env.JWT_KEY;


const cookieOptions =
  process.env.NODE_ENV === "production"
    ? { httpOnly: true, sameSite: "none", secure: true }
    : { httpOnly: true, sameSite: "lax", secure: false };

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email & Password Required" });

    const admin = await Admin.findOne({ email });
    if (!admin)
      return res.status(401).json({ message: "Invalid Credentials" });

    if (!admin.isActive)
      return res.status(403).json({ message: "Account Disabled" });

    const match = await bcrypt.compare(password, admin.password);
    if (!match)
      return res.status(401).json({ message: "Invalid Credentials" });

    if (!process.env.JWT_KEY) {
      throw new Error("JWT_KEY missing in .env");
    }

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_KEY,
      { expiresIn: "1d" }
    );

    res.cookie("adminToken", token, cookieOptions);

    res.json({
      success: true,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
      token
    });
  } catch (err) {
    console.error("ADMIN LOGIN ERROR:", err.message);
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};


export const adminLogout = async (req, res) => {
  try {
    const token = req.cookies?.adminToken;
    if (token) {
      const decoded = jwt.decode(token);
      await BlacklistedToken.create({
        token,
        expiresAt: new Date(decoded.exp * 1000),
      });
    }
    res.clearCookie("adminToken", cookieOptions);
    res.json({ success: true, message: "Logged Out Successfully" });
  } catch {
    res.status(500).json({ message: "Logout Error" });
  }
};

/* ================= PROFILE ================= */
export const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).select("-password");

    if (!admin)
      return res.status(404).json({ message: "Admin Not Found" });

    res.json({ success: true, admin });
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};


export const updateAdminProfile = (req, res) => {
  upload.single("profileImage")(req, res, async (err) => {
    try {
      if (err) {
        return res.status(400).json({ message: "Image upload failed" });
      }

      const adminId = req.user.id;
      const { name, email, phone } = req.body;

      let data = { name, email, phone };

      if (req.file) {
        const admin = await Admin.findById(adminId);

        if (admin?.profile?.public_id) {
          await cloudinary.uploader.destroy(admin.profile.public_id);
        }

        const uploaded = await cloudinary.uploader.upload(
          req.file.path,
          { folder: `admin_profiles/${adminId}` }
        );

        data.profile = {
          url: uploaded.secure_url,
          public_id: uploaded.public_id,
        };

        fs.unlinkSync(req.file.path); 
      }

      const updated = await Admin.findByIdAndUpdate(
        adminId,
        data,
        { new: true }
      ).select("-password");

      res.json({
        success: true,
        message: "Profile Updated Successfully",
        admin: updated,
      });
    } catch (error) {
      console.error("PROFILE UPDATE ERROR:", error);
      res.status(500).json({ message: "Server Error" });
    }
  });
};




export const changeAdminPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword)
      return res.status(400).json({ message: "Both Passwords Required" });

    const admin = await Admin.findById(req.user.id);
    if (!admin) return res.status(404).json({ message: "Admin Not Found" });

    const match = await bcrypt.compare(oldPassword, admin.password);
    if (!match)
      return res.status(401).json({ message: "Old Password Incorrect" });

    admin.password = await bcrypt.hash(newPassword, 10);
    await admin.save();

    res.json({ success: true, message: "Password Updated Successfully" });
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};

/* ================= MY PRODUCTS ================= */
export const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ assignedTo: req.user.id });
    res.json({ success: true, products });
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};

/* ================= UPDATE PRODUCT (Cloudinary Only) ================= */
export const updateMyProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product Not Found" });

    if (product.assignedTo.toString() !== req.user.id)
      return res.status(403).json({ message: "Access Denied" });

    if (req.body.image) {
      const upload = await cloudinary.uploader.upload(req.body.image, {
        folder: "products",
      });
      req.body.image = upload.secure_url;
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ success: true, product: updated });
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};

/* ================= DELETE PRODUCT ================= */
export const deleteMyProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product Not Found" });

    if (product.assignedTo.toString() !== req.user.id)
      return res.status(403).json({ message: "Access Denied" });

    await product.deleteOne();
    res.json({ success: true, message: "Product Deleted" });
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};

/* ================= DASHBOARD STATS ================= */
export const getAdminStats = async (req, res) => {
  try {
    const adminId = req.user.id;
    const stats = {
      products: await Product.countDocuments({ assignedTo: adminId }),
      services: await Service.countDocuments({ assignedTo: adminId }),
      contacts: await Contact.countDocuments({ adminId }),
      enquiries: await Enquiry.countDocuments({ adminId }),
      feedbacks: await Feedback.countDocuments({ adminId }),
    };
    res.json({ success: true, stats });
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};
