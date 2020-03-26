/* jshint esversion: 6 */
/* eslint-disable class-methods-use-this */

import tagService from '../db/tagService';
import Todo from '../model/todo';
import todoService from '../db/todoService';

class TodoController {

  // GET the list of todos
  getTodoList(req, res) {
    console.log('GET Todo list');

    // Find all todos
    todoService.findAll(function (todos) {
      return res.status(200).send({
        success: 'true',
        message: 'todos retrieved successfully',
        todos: todos
      });
    });
  }

  // GET a specific todo
  getTodo(req, res) {
    console.log('GET todo');
    const id = parseInt(req.params.id, 10);

    // Find todo by id
    todoService.findById(id, function (todo) {
      if (todo != null) {
        return res.status(200).send({
          success: 'true',
          message: 'todo retrieved successfully',
          todo: todo
        });
      } else {
        return res.status(404).send({
          success: 'false',
          message: 'todo does not exist',
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
    let statut = req.body.statut;
    let tags = req.body.tags;

    // Checks if each param is given
    if (!title) {
      return res.status(400).send({
        success: 'false',
        message: 'title is required',
      });
    } else if (!dateBegin) {
      return res.status(400).send({
        success: 'false',
        message: 'date begin is required',
      });
    } else if (!dateEnd) {
      return res.status(400).send({
        success: 'false',
        message: 'date end is required',
      });
    } else if (!statut) {
      return res.status(400).send({
        success: 'false',
        message: 'statut is required',
      });
    } else if (!tags) {
      return res.status(400).send({
        success: 'false',
        message: 'tags is required',
      });
    }

    // Create a new Todo
    const todo = new Todo(title, dateBegin, dateEnd, statut, tags);

    // Add todo
    todoService.add(todo, function (todo) {
      if (todo != null) {
        return res.status(200).send({
          success: 'true',
          message: 'todo added successfully',
          todo: todo
        });
      } else {
        return res.status(404).send({
          success: 'false',
          message: 'todo has not been added',
        });
      }
    });
  }

  // UPDATE a specific todo
  updateTodo(req, res) {
    console.log('UPDATE todo');
    const id = parseInt(req.params.id, 10);

    // Find todo by id
    todoService.findById(id, function (todo) {
      if (todo == null) {
        return res.status(200).send({
          success: 'false',
          message: 'todo does not exist'
        });
      }

      let title = req.body.title;
      let dateBegin = req.body.dateBegin;
      let dateEnd = req.body.dateEnd;
      let statut = req.body.statut;
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
      if (req.body.statut === undefined) {
        statut = todo.statut;
      }
      if (req.body.tags === undefined) {
        tags = todo.tags;
      }

      // Update Todo
      todo.title = title;
      todo.dateBegin = dateBegin;
      todo.dateEnd = dateEnd;
      todo.statut = statut;
      todo.tags = tags;

      // Update todo
      todoService.update(id, todo, function (todo) {
        return res.status(201).send({
          success: 'true',
          message: 'todo updated successfully',
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
    todoService.delete(id, function (isDeleted) {
      if (isDeleted === 1) {
        return res.status(200).send({
          success: 'true',
          message: 'Todo deleted successfuly',
        });
      } else {
        return res.status(404).send({
          success: 'false',
          message: 'todo not found',
        });
      }
    });
  }
}

const todoController = new TodoController();
export default todoController;