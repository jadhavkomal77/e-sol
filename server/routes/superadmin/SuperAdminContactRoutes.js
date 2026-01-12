// import express from "express";
// import {
//   createSuperAdminContact,
//   getSuperAdminContacts,
//   updateContactStatus,
//   deleteContact
// } from "../../controllers/superadmin/SuperAdminContactController.js";

// import { verifyToken, superAdminOnly } from "../../middleware/authMiddleware.js";

// const router = express.Router();

// /* 🌍 PUBLIC — Contact Us Form (No Login Required) */
// router.post("/public", createSuperAdminContact);

// /* 🔐 SUPERADMIN PANEL — Protected Routes */
// router.use(verifyToken, superAdminOnly);

// router.get("/", getSuperAdminContacts);
// router.put("/:id/status", updateContactStatus);
// router.delete("/:id", deleteContact);

// export default router;







import express from "express";
import {
  createSuperAdminContact,
  getSuperAdminContacts,
  updateContactStatus,
  deleteContact
} from "../../controllers/superadmin/SuperAdminContactController.js";

import { verifyToken, superAdminOnly } from "../../middleware/authMiddleware.js";

const router = express.Router();

/* 🌍 PUBLIC — Contact Us Form (No Login Required) */
router.post("/public", createSuperAdminContact);

/* 🔐 SUPERADMIN PANEL — Protected Routes */
router.use(verifyToken, superAdminOnly);

router.get("/", getSuperAdminContacts);
router.put("/:id/status", updateContactStatus);
router.delete("/:id", deleteContact);

export default router;
