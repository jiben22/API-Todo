/* jshint esversion: 6 */
/* eslint-disable class-methods-use-this */

import todoService from '../db/todoService';
import tagService from '../db/tagService';
import client from '../db/client';

class TodoController {

  // GET the list of todos
  getTodoList(req, res) {
    console.log('GET Todo list');

    return res.status(200).send({
      success: 'true',
      message: 'todos retrieved successfully',
      todos: {
        title: "TP1",
        dateBegin: "25/03/2020",
        dateEnd: "26/03/2020",
        statut: "ok",
        tags: ["travail", "web"]
      }
    });
  }

  // GET a specific todo
  getTodo(req, res) {
    console.log('GET todo');
    const id = parseInt(req.params.id, 10);

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
    let description = req.body.description;

    if (!title) {
      return res.status(400).send({
        success: 'false',
        message: 'title is required',
      });
    } else if (!description) {
      return res.status(400).send({
        success: 'false',
        message: 'description is required',
      });
    }

    todoService.add(title, description, function (todo) {
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
    let todoFound;
    let itemIndex;
    db.map((todo, index) => {
      if (todo.id === id) {
        todoFound = todo;
        itemIndex = index;
      }
    });

    if (!todoFound) {
      return res.status(404).send({
        success: 'false',
        message: 'todo not found',
      });
    }

    if (!req.body.title) {
      return res.status(400).send({
        success: 'false',
        message: 'title is required',
      });
    } else if (!req.body.description) {
      return res.status(400).send({
        success: 'false',
        message: 'description is required',
      });
    }

    const newTodo = {
      id: todoFound.id,
      title: req.body.title || todoFound.title,
      description: req.body.description || todoFound.description,
    };

    db.splice(itemIndex, 1, newTodo);

    return res.status(201).send({
      success: 'true',
      message: 'todo added successfully',
      newTodo,
    });
  }

  // DELETE a specific todo
  deleteTodo(req, res) {
    console.log('DELETE todo');
    const id = parseInt(req.params.id, 10);
    
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