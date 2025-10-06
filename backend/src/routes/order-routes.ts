import express from "express";
import { authenticateToken } from "../middleware";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getMyOrders,
  getOrderById,
  updateOrder,
} from "../controllers/order-controller";

const router = express.Router();

router.post("/create-order", authenticateToken, createOrder);
router.get("/orders/my", authenticateToken, getMyOrders);
router.get("/orders/:id", authenticateToken, getOrderById);

router.get("/orders", authenticateToken, getAllOrders);
router.patch("/update-order/:id", authenticateToken, updateOrder);
router.delete("/delete-order/:id", authenticateToken, deleteOrder);

export default router;
