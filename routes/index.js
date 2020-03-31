/* jshint esversion: 6 */

import express from 'express';
import DefaultController from '../controller/defaultController';
import TagController from '../controller/tagController';
import TodoController from '../controller/todoController';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';

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

/* Swagger */
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/* Default */
router.get('*', DefaultController.default);
router.post('*', DefaultController.default);
router.put('*', DefaultController.default);
router.delete('*', DefaultController.default);

export default router;