
import Admin from "../models/Admin.js";
import Product from "../models/admin/Product.js";
import Contact from "../models/Contact.js";
import Enquiry from "../models/admin/Enquiry.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { uploadSingle } from "../utils/upload.js";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";
import BlacklistedToken from "../models/BlacklistedToken.js";
import Service from "../models/admin/Service.js";
import Feedback from "../models/admin/Feedback.js";

const JWT_SECRET = process.env.JWT_KEY;

// Secure Cookies
// const cookieOptions = {
//   httpOnly: true,
//   sameSite: "strict",
//   secure: process.env.NODE_ENV === "production",
// };
const cookieOptions =
  process.env.NODE_ENV === "production"
    ? {
        httpOnly: true,
        sameSite: "none", 
        secure: true,   
      }
    : {
        httpOnly: true,
        sameSite: "lax", 
        secure: false,
      };


// ⭐ ADMIN LOGIN
// export const adminLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email?.trim() || !password?.trim())
//       return res.status(400).json({ message: "Email & Password Required" });

//     const admin = await Admin.findOne({ email });
//     if (!admin) return res.status(404).json({ message: "Invalid Credentials" });

//     if (!admin.isActive)
//       return res.status(403).json({ message: "Account Disabled" });

//     const match = await bcrypt.compare(password, admin.password);
//     if (!match) return res.status(401).json({ message: "Invalid Credentials" });

//     const token = jwt.sign(
//       { id: admin._id, role: "admin" },
//       JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     // res.cookie("adminToken", token, cookieOptions);

//     // res.json({
//     //   success: true,
//     //   message: "Login Success",
//     //   admin: {
//     //     id: admin._id,
//     //     name: admin.name,
//     //     email: admin.email,
//     //   },
//     // });
//     res.cookie("adminToken", token, cookieOptions);

// res.json({
//   success: true,
//   message: "Login Success",
//   admin: {
//     id: admin._id,
//     name: admin.name,
//     email: admin.email,
//   },
// });

//   } catch {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password?.trim())
      return res.status(400).json({ message: "Email & Password Required" });

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Invalid Credentials" });

    if (!admin.isActive)
      return res.status(403).json({ message: "Account Disabled" });

    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(401).json({ message: "Invalid Credentials" });

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 🍪 Cookie (optional – keep as is)
    res.cookie("adminToken", token, cookieOptions);

    // ✅ SEND TOKEN TO FRONTEND
    res.json({
      success: true,
      message: "Login Success",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};


// ⭐ LOGOUT + TOKEN BLACKLIST
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
    // res.clearCookie("adminToken", cookieOptions);
    // res.json({ success: true, message: "Logged Out Successfully" });
    res.clearCookie("adminToken", cookieOptions);
res.json({ success: true, message: "Logged Out Successfully" });

  } catch {
    res.status(500).json({ message: "Logout Error" });
  }
};

// ⭐ GET PROFILE
export const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).select("-password");
    if (!admin) return res.status(404).json({ message: "Admin Not Found" });

    res.json({ success: true, admin });
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};

// ⭐ UPDATE PROFILE (SAFE FILE UPLOAD)
export const updateAdminProfile = async (req, res) => {
  uploadSingle("profile")(req, res, async (err) => {
    if (err) return res.status(400).json({ message: err.message });

    try {
      const { name, email, phone } = req.body;
      let data = { name, email, phone };

      if (req.file && req.file.buffer) {
        const upload = await uploadToCloudinary(
          req.file.buffer,
          "admin_profiles",
          req.file.originalname
        );
        data.profile = upload.secure_url;
      }

      const updated = await Admin.findByIdAndUpdate(req.user.id, data, {
        new: true,
      }).select("-password");

      res.json({ success: true, message: "Profile Updated", admin: updated });

    } catch {
      res.status(500).json({ message: "Server Error" });
    }
  });
};

// ⭐ CHANGE PASSWORD
export const changeAdminPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword)
      return res.status(400).json({ message: "Both Passwords Required" });

    if (newPassword.length < 8)
      return res.status(400).json({
        message: "Password must be at least 8 characters long",
      });

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

// ⭐ MY PRODUCTS
export const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ assignedTo: req.user.id });
    res.json({ success: true, total: products.length, products });
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};

// ⭐ UPDATE PRODUCT (With image upload)
export const updateMyProduct = async (req, res) => {
  uploadSingle("image")(req, res, async (err) => {
    if (err) return res.status(400).json({ message: err.message });

    try {
      const product = await Product.findById(req.params.id);
      if (!product)
        return res.status(404).json({ message: "Product Not Found" });

      if (product.assignedTo.toString() !== req.user.id)
        return res.status(403).json({ message: "Access Denied" });

      if (req.file && req.file.buffer) {
        const upload = await uploadToCloudinary(
          req.file.buffer,
          "products",
          req.file.originalname
        );
        req.body.image = upload.secure_url;
      }

      const updated = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      res.json({
        success: true,
        message: "Product Updated",
        product: updated,
      });

    } catch {
      res.status(500).json({ message: "Server Error" });
    }
  });
};

// ⭐ DELETE PRODUCT
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

// ⭐ ADMIN DASHBOARD STATS
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
