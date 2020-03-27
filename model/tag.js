/* jshint esversion: 6 */

class Tag {

    constructor(title) {
        // ID unique du tag
        this._id = id++;
        // Titre du tag
        this.title = title;
    }

    get id() {
        return this._id;
    }
}

var id = 0;

export default Tag;