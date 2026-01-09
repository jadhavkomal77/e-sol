import express from "express";
import { getAllLogs, clearLogs } from "../controllers/activityLogController.js";
import { superAdminOnly, verifyToken } from "../middleware/authMiddleware.js";


const router = express.Router();

router.get("/", verifyToken, superAdminOnly, getAllLogs);
router.delete("/", verifyToken, superAdminOnly, clearLogs);

export default router;
