/* jshint esversion: 6 */
/* eslint-disable class-methods-use-this */

import Todo from '../model/todo';
import TodoService from '../db/todoService';
import TodoUtils from './utils/todoUtils';

class TodoController {

  // GET the list of todos
  getTodos(req, res) {
    console.log('GET Todos');

    // Get params
    let params = [];
    params.max_dateEnd = req.query.max_dateEnd;
    params.no_status = req.query.no_status;
    params.status = req.query.status;
    params.tags = req.query.tags;

    // Convert params
    params = TodoUtils.convertParams(params);

    var message = TodoUtils.validateQueryParams(params);
    if (message !== null) {
      return res.status(400).send({
        success: 'false',
        message: message,
      });
    }

    // Find all todos
    TodoService.findAll(function (todos) {
      todos = TodoUtils.filterTodos(todos, params);

      return res.status(200).send({
        success: 'true',
        message: 'Toutes les tâches ont été récupérées',
        todos: todos
      });
    });
  }

  // GET a specific todo
  getTodo(req, res) {
    console.log('GET todo');
    const id = parseInt(req.params.id, 10);

    // Find todo by id
    TodoService.findById(id, function (todo) {
      if (todo != null) {
        return res.status(200).send({
          success: 'true',
          message: 'La tâche a été trouvée',
          todo: todo
        });
      } else {
        return res.status(404).send({
          success: 'false',
          message: 'La tâche n\'existe pas',
        });
      }
    });
  }

  // CREATE a todo
  createTodo(req, res) {
    console.log('CREATE todo');

    let title = req.body.title;
    let dateBegin = req.body.dateBegin;
    let dateEnd = req.body.dateEnd;
    let status = req.body.status;
    let tags = req.body.tags;

    // Checks if each param is given
    if (!title) {
      return res.status(400).send({
        success: 'false',
        message: 'Le titre est requis',
      });
    } else if (!dateBegin) {
      return res.status(400).send({
        success: 'false',
        message: 'La date de début est requise',
      });
    } else if (!dateEnd) {
      return res.status(400).send({
        success: 'false',
        message: 'La date de fin est requise',
      });
    } else if (!status) {
      return res.status(400).send({
        success: 'false',
        message: 'Le statut est requis',
      });
    } else if (!tags) {
      return res.status(400).send({
        success: 'false',
        message: 'Les tags sont requis',
      });
    }

    // Create a new Todo
    const todo = new Todo(title, dateBegin, dateEnd, status, tags);

    // Add todo
    TodoService.add(todo, function (todo) {
      if (todo != null) {
        return res.status(200).send({
          success: 'true',
          message: 'Nouvelle tâche créée',
          todo: todo
        });
      } else {
        return res.status(404).send({
          success: 'false',
          message: 'Nouvelle tâche non ajoutée',
        });
      }
    });
  }

  // UPDATE a specific todo
  updateTodo(req, res) {
    console.log('UPDATE todo');
    const id = parseInt(req.params.id, 10);

    // Find todo by id
    TodoService.findById(id, function (todo) {
      if (todo == null) {
        return res.status(200).send({
          success: 'false',
          message: 'La tâche n\'existe pas'
        });
      }

      let title = req.body.title;
      let dateBegin = req.body.dateBegin;
      let dateEnd = req.body.dateEnd;
      let status = req.body.status;
      let tags = req.body.tags;

      // Get new or old values
      if (req.body.title === undefined) {
        title = todo.title;
      }
      if (req.body.dateBegin === undefined) {
        dateBegin = todo.dateBegin;
      }
      if (req.body.dateEnd === undefined) {
        dateEnd = todo.dateEnd;
      }
      if (req.body.status === undefined) {
        status = todo.status;
      }
      if (req.body.tags === undefined) {
        tags = todo.tags;
      }

      // Update Todo
      todo.title = title;
      todo.dateBegin = dateBegin;
      todo.dateEnd = dateEnd;
      todo.status = status;
      todo.tags = tags;

      // Update todo
      TodoService.update(id, todo, function (todo) {
        return res.status(201).send({
          success: 'true',
          message: 'La tâche a été mise à jour',
          todo: todo,
        });
      });
    });
  }

  // DELETE a specific todo
  deleteTodo(req, res) {
    console.log('DELETE todo');
    const id = parseInt(req.params.id, 10);

    // Delete todo
    TodoService.delete(id, function (isDeleted) {
      if (isDeleted === 1) {
        return res.status(200).send({
          success: 'true',
          message: 'La tâche a été supprimée',
        });
      } else {
        return res.status(404).send({
          success: 'false',
          message: 'La tâche n\'existe pas',
        });
      }
    });
  }
}

const todoController = new TodoController();
export default todoController;