module.exports = class Todo {

    /**
     * Champs privés
     */

    // ID unique de la tâche
    static #id = 0;
    // Titre de la tâche
    #title;
    // Date de début de la tâche
    #dateBegin;
    // Date d’échéance de la tâche
    #dateEnd;
    // Degré d’avancement 
    #statut;
    // Liste de catégories
    #tags;

    constructor(title, dateBegin, dateEnd, statut, tags) {
        this.id = Todo.#id++;
        this.#title = title;
        this.#dateBegin = dateBegin;
        this.#dateEnd = dateEnd;
        this.#statut = statut;
        this.#tags = tags;
    }

    static get id() {
        return this.#id;
    }

    get title() {
        return this.#title;
    }

    get dateBegin() {
        return this.#dateBegin;
    }

    get dateEnd() {
        return this.#dateEnd;
    }

    get statut() {
        return this.#statut;
    }

    get tags() {
        return this.#tags;
    }

    toJSON() {
        return {
            id : this.id,
            title : this.title,
            dateBegin : this.dateBegin,
            dateEnd : this.dateEnd,
            statut : this.statut,
            tags : this.tags
        };
    }
};