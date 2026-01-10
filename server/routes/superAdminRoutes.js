import express from "express";
import {
  superAdminRegister,
  superAdminLogin,
  superAdminLogout,
  getSuperAdminProfile,
  updateSuperAdminProfile,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  toggleAdminStatus,
  getAllAdmins,
} from "../controllers/superAdminController.js";

import {
  verifyToken,
  superAdminOnly
} from "../middleware/authMiddleware.js";

const router = express.Router();

/* ================= PUBLIC ROUTES ================= */
router.post("/register", superAdminRegister);
router.post("/login", superAdminLogin);

/* ================ PROTECTED ROUTES ================ */
router.use(verifyToken, superAdminOnly);

router.post("/logout", superAdminLogout);

// Profile
router.get("/profile", getSuperAdminProfile);
router.put("/profile", updateSuperAdminProfile); // ❌ multer removed

// Admin Management
router.post("/admin", createAdmin);
router.put("/admin/:id", updateAdmin);
router.delete("/admin/:id", deleteAdmin);
router.put("/admin/toggle/:id", toggleAdminStatus);

// All admins
router.get("/admins", getAllAdmins);

export default router;
