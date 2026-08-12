export const mockTasks = [
  { id: 1, title: "Set up Express server", dueDate: "2026-08-01", completed: false },
  { id: 2, title: "Write GT5 routes", dueDate: "2026-08-02", completed: false },
  { id: 3, title: "Test API endpoints in Postman", dueDate: "2026-08-03", completed: true },
];

export const formatDate = (date) => `Due: ${date.toLocaleDateString()}`;

export const validateTask = ({ title, dueDate } = {}) => Boolean(title && dueDate);

export const mergeTaskUpdate = (original, ...updates) =>
  Object.assign({}, original, ...updates);

export class TaskValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "TaskValidationError";
  }
}

export const createTask = (taskData) => {
  if (!validateTask(taskData)) {
    throw new TaskValidationError("Invalid task data");
  }
  return { id: Date.now(), completed: false, ...taskData };
};