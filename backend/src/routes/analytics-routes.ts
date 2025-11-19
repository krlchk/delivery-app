import express from "express";
import { getAnalytics } from "../controllers/analytics-controller";
import { authenticateToken } from "../middleware";

const router = express.Router();

router.get("/analytics", authenticateToken, getAnalytics);

export default router;
