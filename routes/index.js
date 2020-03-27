/* jshint esversion: 6 */

import express from 'express';
import TagController from '../controller/tagController';
import TodoController from '../controller/todoController';

const router = express.Router();

/* Todos */
router.get('/api/v1/todos', TodoController.getTodos);
/* Todo */
router.get('/api/v1/todo/:id', TodoController.getTodo);
router.post('/api/v1/todo', TodoController.createTodo);
router.put('/api/v1/todo/:id', TodoController.updateTodo);
router.delete('/api/v1/todo/:id', TodoController.deleteTodo);
/* Tags */
router.get('/api/v1/tags', TagController.getTags);
/* Tag */
router.get('/api/v1/tag/:id', TagController.getTag);
router.post('/api/v1/tag', TagController.createTag);
router.put('/api/v1/tag/:id', TagController.updateTag);
router.delete('/api/v1/tag/:id', TagController.deleteTag);

export default router;