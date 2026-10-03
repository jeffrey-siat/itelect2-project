import db from "../models/index.cjs";

const { Task, User } = db;

export async function listTasks(req, res) {
  const tasks = await Task.findAll({ include: User, order: [["id", "ASC"]] });
  res.json(tasks);
}

export async function getTask(req, res) {
  const task = await Task.findByPk(req.params.id, { include: User });
  if (!task) {
    return res.status(404).json({ error: `No task found with id ${req.params.id}` });
  }
  res.json(task);
}

export async function listUsers(req, res) {
  const users = await User.findAll({ order: [["id", "ASC"]] });
  res.json(users);
}

export async function createTask(req, res) {
  const task = await Task.create(req.body);
  res.status(201).json(task);
}

export async function updateTask(req, res) {
  const task = await Task.findByPk(req.params.id);
  if (!task) {
    return res.status(404).json({ error: `No task found with id ${req.params.id}` });
  }
  await task.update(req.body);
  res.json(task);
}

export async function deleteTask(req, res) {
  const task = await Task.findByPk(req.params.id);
  if (!task) {
    return res.status(404).json({ error: `No task found with id ${req.params.id}` });
  }
  await task.destroy();
  res.json({ message: "Deleted", task });
}