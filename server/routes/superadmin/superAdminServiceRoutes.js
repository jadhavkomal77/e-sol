import express from "express";
import {
  addSuperService,
  getSuperServicesPrivate,
  getSuperServicesPublic,
  getSuperServiceByIdPublic,
  updateSuperService,
  deleteSuperService,
} from "../../controllers/superadmin/superAdminServiceController.js";
import { verifyToken, superAdminOnly } from "../../middleware/authMiddleware.js";

const router = express.Router();

/* 🌍 Public Website */
router.get("/public", getSuperServicesPublic);
router.get("/public/:id", getSuperServiceByIdPublic);

/* 🔐 SuperAdmin Panel */
router.use(verifyToken, superAdminOnly);
router.get("/", getSuperServicesPrivate);
router.post("/", addSuperService);
router.put("/:id", updateSuperService);
router.delete("/:id", deleteSuperService);

export default router;
