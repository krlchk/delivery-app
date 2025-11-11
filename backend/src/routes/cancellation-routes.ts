import express from "express";
import { createCancellation } from "../controllers/cancellation-controller";
import { authenticateToken } from "../middleware";

const router = express.Router();

router.post("/create-cancellation", authenticateToken, createCancellation);

export default router;
