import { Router } from 'express';
import { getServers, addServer, updateServer, deleteServer, getServer } from '../controllers/server.controller.js';
import { getTasks, addTask, updateTask, deleteTask } from '../controllers/task.controller.js';

const router = Router();

// Server Routes
router.get("/servers", getServers);
router.get("/servers/:id", getServer)
router.post('/add-server', addServer);
router.put('/edit-server/:id', updateServer);
router.delete('/delete-server/:id', deleteServer);

// Task Routes
router.get("/tasks", getTasks);
router.post('/add-task', addTask);
router.put('/edit-task/:id', updateTask);
router.delete('/delete-task/:id', deleteTask);

export default router;
