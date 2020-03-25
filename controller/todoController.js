const Todo = require("../model/todo");

module.exports = class TodoController {

    // Création d'une tâche
    addTodo(attributes) {
        console.log("Création d'une tâche");

        let title = attributes['title'];
        let dateBegin = attributes['dateBegin'];
        let dateEnd = attributes['dateEnd'];
        let statut = attributes['statut'];
        let tags = attributes['tags'];            
        let todo = new Todo(title, dateBegin, dateEnd, statut, tags);
        
        return todo;
    }

    // Récupération de la tâche
    getTodo(id) {
        console.log("Récupération de la tâche : " + id);

    }

    // Mise à jour d'une tâche
    updateTodo() {
        console.log("Mise à jour d'une tâche");

    }

    // Suppression de la tâche
    deleteTodo(id) {
        console.log("Suppression de la tâche :" + id);

    }
}