import express from "express";
import { mockTasks } from "../src/utils.js";

const router = express.Router();

// Cached in memory so we don't hit the external API on every request.
// Populated once at startup by setCachedUsers() -- see server.js.
let cachedUsers = [];

export const setCachedUsers = (users) => {
  cachedUsers = users;
};

// GET /api/tasks -- returns the mock task array from utils.js
router.get("/tasks", (req, res) => {
  res.json(mockTasks);
});

// GET /api/tasks/:id -- returns a single task, or 404 if no match
router.get("/tasks/:id", (req, res) => {
  const task = mockTasks.find((t) => String(t.id) === req.params.id);

  if (!task) {
    return res.status(404).json({ error: `No task found with id ${req.params.id}` });
  }

  res.json(task);
});

// GET /api/users -- returns the cached, transformed user list from GT4's fetchSampleUsers()
router.get("/users", (req, res) => {
  res.json(cachedUsers);
});

export default router;