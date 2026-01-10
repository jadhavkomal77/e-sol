
// import SuperAdmin from "../models/SuperAdmin.js";
// import Admin from "../models/Admin.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { uploadSingle } from "../utils/upload.js";
// import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";
// import { logActivity } from "../utils/logActivity.js";
// import BlacklistedToken from "../models/BlacklistedToken.js";

// const JWT_SECRET = process.env.JWT_KEY;

// const cookieOptions = {
//   httpOnly: true,
//   secure: process.env.NODE_ENV === "production",
//   sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
//   path: "/"
// };

// // REGISTER SUPERADMIN
// export const superAdminRegister = async (req, res) => {
//   try {
//     const { name, email, password, phone } = req.body;
//     if (!name || !email || !password || !phone)
//       return res.status(400).json({ message: "All fields are required" });

//     const exists = await SuperAdmin.findOne({ email });
//     if (exists)
//       return res.status(400).json({ message: "Email already registered" });

//     const hashedPass = await bcrypt.hash(password, 10);

//     const superAdmin = await SuperAdmin.create({
//       name,
//       email,
//       phone,
//       password: hashedPass,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Registration Successful",
//       superAdmin
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // LOGIN SUPERADMIN
// export const superAdminLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const superAdmin = await SuperAdmin.findOne({ email });
//     if (!superAdmin)
//       return res.status(404).json({ message: "Invalid Email or Password" });

//     const match = await bcrypt.compare(password, superAdmin.password);
//     if (!match)
//       return res.status(401).json({ message: "Invalid Email or Password" });

//     const token = jwt.sign(
//       { id: superAdmin._id, role: "superadmin" },
//       JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.cookie("superToken", token, cookieOptions);

//     res.json({
//       success: true,
//       message: "Login Successful",
//       admin: {
//         id: superAdmin._id,
//         name: superAdmin.name,
//         email: superAdmin.email,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // LOGOUT
// export const superAdminLogout = async (req, res) => {
//   try {
//     const token = req.cookies?.superToken;

//     if (token) {
//       const decoded = jwt.decode(token);
//       if (decoded?.exp) {
//         await BlacklistedToken.create({
//           token,
//           expiresAt: new Date(decoded.exp * 1000),
//         });
//       }
//     }

//     res.clearCookie("superToken", cookieOptions);
//     res.json({ success: true, message: "Successfully Logged Out" });
//   } catch (error) {
//     res.status(500).json({ message: "Logout Failed" });
//   }
// };

// // GET PROFILE
// export const getSuperAdminProfile = async (req, res) => {
//   try {
//     const profile = await SuperAdmin.findById(req.user.id).select("-password");
//     res.json({ success: true, profile });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // UPDATE PROFILE
// export const updateSuperAdminProfile = async (req, res) => {
//   uploadSingle("profile")(req, res, async (err) => {
//     try {
//       if (err) return res.status(400).json({ message: err.message });

//       const { name, email, phone } = req.body;
//       let updateData = { name, email, phone };

//       if (req.file && req.file.buffer) {
//         const upload = await uploadToCloudinary(
//           req.file.buffer,
//           "superadmin_profiles",
//           req.file.originalname
//         );
//         updateData.profile = upload.secure_url;
//       }

//       const updated = await SuperAdmin.findByIdAndUpdate(
//         req.user.id,
//         updateData,
//         { new: true }
//       ).select("-password");

//       res.json({
//         success: true,
//         message: "Profile Updated Successfully",
//         updated,
//       });

//     } catch (error) {
//       res.status(500).json({ message: "Server Error" });
//     }
//   });
// };

// // GET ALL ADMINS
// export const getAllAdmins = async (req, res) => {
//   try {
//     const admins = await Admin.find().select("-password");
//     res.json({ success: true, admins });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // CREATE ADMIN
// export const createAdmin = async (req, res) => {
//   try {
//     const { name, email, password, phone, websiteSlug } = req.body;

//     if (!websiteSlug)
//       return res.status(400).json({ message: "websiteSlug required" });

//     const exists = await Admin.findOne({
//       $or: [{ email }, { websiteSlug }],
//     });

//     if (exists)
//       return res.status(400).json({ message: "Email or Slug already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const admin = await Admin.create({
//       name,
//       email,
//       phone,
//       password: hashedPassword,
//       role: "admin",
//       isActive: true,
//       websiteSlug: websiteSlug.toLowerCase(),
//     });

//     res.json({ success: true, admin });

//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // UPDATE ADMIN
// export const updateAdmin = async (req, res) => {
//   try {
//     const data = { ...req.body };
//     if (data.password) {
//       data.password = await bcrypt.hash(data.password, 10);
//     }

//     const admin = await Admin.findByIdAndUpdate(req.params.id, data, {
//       new: true,
//     }).select("-password");

//     res.json({ success: true, admin });

//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // DELETE ADMIN
// export const deleteAdmin = async (req, res) => {
//   try {
//     await Admin.findByIdAndDelete(req.params.id);
//     res.json({ success: true, message: "Admin Deleted" });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // TOGGLE ADMIN
// export const toggleAdminStatus = async (req, res) => {
//   try {
//     const admin = await Admin.findById(req.params.id);
//     if (!admin)
//       return res.status(404).json({ message: "Admin Not Found" });

//     admin.isActive = !admin.isActive;
//     await admin.save();

//     res.json({
//       success: true,
//       message: `${admin.name} is now ${admin.isActive ? "Active" : "Inactive"}`,
//     });

//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };





import SuperAdmin from "../models/SuperAdmin.js";
import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import BlacklistedToken from "../models/BlacklistedToken.js";

const JWT_SECRET = process.env.JWT_KEY;

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
  path: "/",
};

/* ================= REGISTER ================= */
export const superAdminRegister = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || !phone)
      return res.status(400).json({ message: "All fields are required" });

    const exists = await SuperAdmin.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Email already registered" });

    const hashedPass = await bcrypt.hash(password, 10);

    const superAdmin = await SuperAdmin.create({
      name,
      email,
      phone,
      password: hashedPass,
    });

    res.status(201).json({
      success: true,
      message: "Registration Successful",
      superAdmin,
    });
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};

/* ================= LOGIN ================= */
export const superAdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const superAdmin = await SuperAdmin.findOne({ email });
    if (!superAdmin)
      return res.status(404).json({ message: "Invalid Email or Password" });

    const match = await bcrypt.compare(password, superAdmin.password);
    if (!match)
      return res.status(401).json({ message: "Invalid Email or Password" });

    const token = jwt.sign(
      { id: superAdmin._id, role: "superadmin" },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("superToken", token, cookieOptions);

    res.json({
      success: true,
      message: "Login Successful",
      admin: {
        id: superAdmin._id,
        name: superAdmin.name,
        email: superAdmin.email,
      },
    });
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};

/* ================= LOGOUT ================= */
export const superAdminLogout = async (req, res) => {
  try {
    const token = req.cookies?.superToken;

    if (token) {
      const decoded = jwt.decode(token);
      if (decoded?.exp) {
        await BlacklistedToken.create({
          token,
          expiresAt: new Date(decoded.exp * 1000),
        });
      }
    }

    res.clearCookie("superToken", cookieOptions);
    res.json({ success: true, message: "Successfully Logged Out" });
  } catch {
    res.status(500).json({ message: "Logout Failed" });
  }
};

/* ================= PROFILE ================= */
export const getSuperAdminProfile = async (req, res) => {
  try {
    const profile = await SuperAdmin.findById(req.user.id).select("-password");
    res.json({ success: true, profile });
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};

/* ================= UPDATE PROFILE (Cloudinary Only) ================= */
export const updateSuperAdminProfile = async (req, res) => {
  try {
    const { name, email, phone, profile } = req.body;
    let updateData = { name, email, phone };

    // ✅ Base64 → Cloudinary
    if (profile) {
      const upload = await cloudinary.uploader.upload(profile, {
        folder: "superadmin_profiles",
      });
      updateData.profile = upload.secure_url;
    }

    const updated = await SuperAdmin.findByIdAndUpdate(
      req.user.id,
      updateData,
      { new: true }
    ).select("-password");

    res.json({
      success: true,
      message: "Profile Updated Successfully",
      updated,
    });
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};

/* ================= ADMINS ================= */
export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select("-password");
    res.json({ success: true, admins });
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};

/* ================= CREATE ADMIN ================= */
export const createAdmin = async (req, res) => {
  try {
    const { name, email, password, phone, websiteSlug } = req.body;

    if (!websiteSlug)
      return res.status(400).json({ message: "websiteSlug required" });

    const exists = await Admin.findOne({
      $or: [{ email }, { websiteSlug }],
    });

    if (exists)
      return res.status(400).json({ message: "Email or Slug already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role: "admin",
      isActive: true,
      websiteSlug: websiteSlug.toLowerCase(),
    });

    res.json({ success: true, admin });
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};

/* ================= UPDATE ADMIN ================= */
export const updateAdmin = async (req, res) => {
  try {
    const data = { ...req.body };
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const admin = await Admin.findByIdAndUpdate(req.params.id, data, {
      new: true,
    }).select("-password");

    res.json({ success: true, admin });
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};

/* ================= DELETE ADMIN ================= */
export const deleteAdmin = async (req, res) => {
  try {
    await Admin.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Admin Deleted" });
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};

/* ================= TOGGLE ADMIN ================= */
export const toggleAdminStatus = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin)
      return res.status(404).json({ message: "Admin Not Found" });

    admin.isActive = !admin.isActive;
    await admin.save();

    res.json({
      success: true,
      message: `${admin.name} is now ${admin.isActive ? "Active" : "Inactive"}`,
    });
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};
