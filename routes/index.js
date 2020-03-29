/* jshint esversion: 6 */

import express from 'express';
import TagController from '../controller/tagController';
import TodoController from '../controller/todoController';

const router = express.Router();

/* Todos */
router.get('/api/v1/todos', TodoController.getTodos);
router.get('/api/v1/todos/:id', TodoController.getTodo);
router.post('/api/v1/todos', TodoController.createTodo);
router.put('/api/v1/todos/:id', TodoController.updateTodo);
router.delete('/api/v1/todos/:id', TodoController.deleteTodo);
/* Tags */
router.get('/api/v1/tags', TagController.getTags);
router.get('/api/v1/tags/:id', TagController.getTag);
router.post('/api/v1/tags', TagController.createTag);
router.put('/api/v1/tags/:id', TagController.updateTag);
router.delete('/api/v1/tags/:id', TagController.deleteTag);

export default router;