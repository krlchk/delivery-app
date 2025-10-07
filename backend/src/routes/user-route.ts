import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  loginUser,
  updateUser,
} from "../controllers";
import { authenticateToken } from "../middleware";

const router = express.Router();

router.post("/register", createUser); //good
router.post("/login", loginUser); //good
router.delete("/delete-user/:id", authenticateToken, deleteUser); //good
router.get("/users", authenticateToken, getAllUsers); //good
router.get("/users/:id", authenticateToken, getUserById); //good
router.patch("/update-user/:id", authenticateToken, updateUser); //good

export default router;
