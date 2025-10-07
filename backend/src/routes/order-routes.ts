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

router.post("/create-order", authenticateToken, createOrder); //good
router.get("/orders/my", authenticateToken, getMyOrders); //good
router.get("/orders/:id", authenticateToken, getOrderById); //good

router.get("/orders", authenticateToken, getAllOrders); //good
router.patch("/update-order/:id", authenticateToken, updateOrder); //good
router.delete("/delete-order/:id", authenticateToken, deleteOrder);

export default router;
