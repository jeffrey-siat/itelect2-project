import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import requireRole from "../middleware/requireRole.js";
import {
  listTasks,
  getTask,
  listUsers,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.get("/tasks", listTasks);
router.get("/tasks/:id", getTask);
router.get("/users", listUsers);
router.post("/tasks", verifyToken, createTask);
router.put("/tasks/:id", verifyToken, updateTask);
router.delete("/tasks/:id", verifyToken, requireRole("admin"), deleteTask);

export default router;