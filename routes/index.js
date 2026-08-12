import express from "express";
import { mockTasks, validateTask, mergeTaskUpdate } from "../src/utils.js";

const router = express.Router();

let nextId = mockTasks.length + 1;


let cachedUsers = [];

export const setCachedUsers = (users) => {
  cachedUsers = users;
};


router.get("/tasks", (req, res) => {
  res.json(mockTasks);
});

router.get("/tasks/:id", (req, res) => {
  const task = mockTasks.find((t) => String(t.id) === req.params.id);

  if (!task) {
    return res.status(404).json({ error: `No task found with id ${req.params.id}` });
  }

  res.json(task);
});

router.get("/users", (req, res) => {
  res.json(cachedUsers);
});

router.post("/tasks", (req, res) => {
  if (!validateTask(req.body)) {
    return res.status(400).json({ error: "title and dueDate required" });
  }

  const task = { id: nextId++, completed: false, ...req.body };
  mockTasks.push(task);
  res.status(201).json(task);
});

router.put("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = mockTasks.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: `No task found with id ${id}` });
  }

  mockTasks[index] = mergeTaskUpdate(mockTasks[index], req.body);
  res.status(200).json(mockTasks[index]);
});

router.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = mockTasks.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: `No task found with id ${id}` });
  }

  const [removed] = mockTasks.splice(index, 1);
  res.status(200).json({ message: "Deleted", task: removed });
});

export default router;