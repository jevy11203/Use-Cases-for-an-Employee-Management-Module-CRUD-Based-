import { Request, Response } from 'express';

// Sample task data
let tasks = [
  { id: 1, title: 'Task 1', completed: false },
  { id: 2, title: 'Task 2', completed: true }
];

// Get all tasks
export const getAllTasks = (req: Request, res: Response) => {
  res.json(tasks);
};

// Get a single task by ID
export const getTaskById = (req: Request, res: Response) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.json(task);
};

// Create a new task
export const createTask = (req: Request, res: Response) => {
  const { title, completed } = req.body;
  const newTask = { id: tasks.length + 1, title, completed };
  tasks.push(newTask);
  res.status(201).json(newTask);
};

// Update a task
export const updateTask = (req: Request, res: Response) => {
  const { title, completed } = req.body;
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  task.title = title;
  task.completed = completed;
  res.json(task);
};

// Delete a task
export const deleteTask = (req: Request, res: Response) => {
  tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
  res.status(204).send();
};
