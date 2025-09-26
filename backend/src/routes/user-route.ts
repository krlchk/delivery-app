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

router.post("/register", createUser);
router.post("/login", loginUser);
router.delete("/delete-user/:id", authenticateToken, deleteUser);
router.get("/users", authenticateToken, getAllUsers);
router.get("/users/:id", authenticateToken, getUserById);
router.patch("/update-user/:id", authenticateToken, updateUser);

export default router;
