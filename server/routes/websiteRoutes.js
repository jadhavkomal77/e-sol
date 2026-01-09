import express from "express";
import { getWebsiteData } from "../controllers/websiteController.js";

const router = express.Router();

router.get("/:slug", getWebsiteData);

export default router;
