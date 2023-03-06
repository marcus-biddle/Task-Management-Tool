import { Router } from 'express';
import { addTodo, deleteTodo, getTodos, updateTodo } from '../controllers/todo.controller.js';

const router = Router();

router.get("/todos", getTodos)
router.post('/add-todo', addTodo)
router.put('/edit-todo/:id', updateTodo)
router.delete('/delte-todo/:id', deleteTodo)

export default router;