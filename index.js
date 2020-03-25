const express = require("express");
const TodoController = require("./controller/todoController");
var constants = require("./lib/constants");

var app = express();
var controller = new TodoController();

var todoList = new Array();

let todoAttributes = {
    "title" : "Titre", 
    "dateBegin" : "25/03/2020", 
    "dateEnd" : "03/01/2020", 
    "statut" : constants.statut.CANCELLED, 
    "tags" : ["travail", "web"]
};

app.listen(3000, () => {
 console.log("Server running on port 3000");
});

app.get("/todo", (req, res, next) => {
    let todo = controller.addTodo(todoAttributes);
    todoList.push(todo);
    res.json(todo.toJSON());
});