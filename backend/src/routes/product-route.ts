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

router.post("/create-product", authenticateToken, createProduct); //good
router.delete("/delete-product/:id", authenticateToken, deleteProduct); //good
router.get("/products", getAllProducts); //good
router.get("/products/:id", getProductById); //good
router.patch("/update-product/:id", authenticateToken, updateProduct); //good

export default router;
