import express from "express";
import db from "../models/index.cjs";

const { Task, User } = db;
const router = express.Router();

router.get("/tasks", async (req, res) => {
  const tasks = await Task.findAll({ include: User, order: [["id", "ASC"]] });
  res.json(tasks);
});

router.get("/tasks/:id", async (req, res) => {
  const task = await Task.findByPk(req.params.id, { include: User });
  if (!task) {
    return res.status(404).json({ error: `No task found with id ${req.params.id}` });
  }
  res.json(task);
});

router.get("/users", async (req, res) => {
  const users = await User.findAll({ order: [["id", "ASC"]] });
  res.json(users);
});

router.post("/tasks", async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json(task);
});

router.put("/tasks/:id", async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) {
    return res.status(404).json({ error: `No task found with id ${req.params.id}` });
  }
  await task.update(req.body);
  res.json(task);
});

router.delete("/tasks/:id", async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) {
    return res.status(404).json({ error: `No task found with id ${req.params.id}` });
  }
  await task.destroy();
  res.json({ message: "Deleted", task });
});

export default router;