/* jshint esversion: 6 */

class Todo {

    constructor(title, dateBegin, dateEnd, statut, tags) {
        // ID unique de la tâche
        this._id = id++;
        // Titre de la tâche
        this.title = title;
        // Date de début de la tâche
        this.dateBegin = dateBegin;
        // Date d’échéance de la tâche
        this.dateEnd = dateEnd;
        // Degré d’avancement 
        this.statut = statut;
        // Liste de catégories
        this.tags = tags;
    }

    get id() {
        return this._id;
    }
}

var id = 0;

export default Todo;