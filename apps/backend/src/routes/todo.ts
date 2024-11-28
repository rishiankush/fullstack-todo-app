import express from "express";
import {
  createTodo,
  getTodos,
  updateTodo,
} from "../controllers/todoController";
import { authenticateToken } from "../authMiddleware";

const router = express.Router();

router.get("/", authenticateToken, getTodos);
router.post("/", authenticateToken, createTodo);
router.put("/", authenticateToken, updateTodo);

export default router;
