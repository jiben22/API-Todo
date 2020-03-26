/* jshint esversion: 6 */

class Todo {

    constructor(title, dateBegin, dateEnd, statut, tags) {
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
}

export default Todo;