import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers";
import { authenticateToken } from "../middleware";

const router = express.Router();

router.post("/create-product", authenticateToken, createProduct);
router.delete("/delete-product/:id", authenticateToken, deleteProduct);
router.get("/products", authenticateToken, getAllProducts);
router.get("/products/:id", authenticateToken, getProductById);
router.patch("/update-product/:id", authenticateToken, updateProduct);

export default router;
