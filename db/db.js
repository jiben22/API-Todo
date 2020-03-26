/* jshint esversion: 6 */

import constants from './constants';

const todos =  [
    {
        id: 1,
        title: "TP1", 
        dateBegin: "25/03/2020", 
        dateEnd: "26/03/2020", 
        statut: constants.statut.COMPLETED, 
        tags: ["travail", "web"]
    },
    {
        id: 2,
        title: "Projet", 
        dateBegin: "25/03/2020", 
        dateEnd: "03/01/2020", 
        statut: constants.statut.IN_PROGRESS,
        tags: ["travail", "web"]
    }
];

export default todos;