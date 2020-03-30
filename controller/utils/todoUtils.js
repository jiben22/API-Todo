/* jshint esversion: 6 */
/* eslint-disable class-methods-use-this */

import moment from 'moment';
import Status from '../../model/status';

class TodoUtils {

    convertParams(params) {
        // Max dateEnd
        if (params.max_dateEnd !== undefined &&
            !isNaN(params.max_dateEnd) &&
            params.max_dateEnd.length === 10) {
            params.max_dateEnd = moment.unix(params.max_dateEnd).format('DD/MM/YYYY');
        }

        // No status
        if (params.no_status !== undefined) {
            if (params.no_status instanceof Array) {
                params.no_status.map((key, value) => params.no_status[value] = key.toUpperCase());
            } else {
                params.no_status = params.no_status.toUpperCase().split(',');
            }
        }

        // Status
        if (params.status !== undefined) {
            if (params.status instanceof Array) {
                params.status.map((key, value) => params.status[value] = key.toUpperCase());
            } else {
                params.status = params.status.toUpperCase().split(',');
            }
        }

        // Tags
        if (params.tags !== undefined) {
            if (params.tags instanceof Array) {
                params.tags.map((key, value) => params.tags[value] = key.charAt(0).toUpperCase() + key.slice(1).toLowerCase());
            } else {
                params.tags = params.tags.split(',');
                params.tags.map((key, value) => params.tags[value] = key.charAt(0).toUpperCase() + key.slice(1).toLowerCase());
            }
        }

        return params;
    }

    validateQueryParams(params) {

        // Return error message
        let message = null;

        // Max dateEnd
        if (params.max_dateEnd !== undefined &&
            !moment(params.max_dateEnd, 'DD/MM/YYYY', true).isValid()) {
            message = "Le paramètre 'max_dateEnd' n'est pas au bon format : timestamp (seconds)";
        } else if (params.no_status !== undefined && 
            0 in params.no_status !== undefined && params.no_status[0] === '') {
            message = "Le paramètre 'no_status' ne contient aucun statut";
        } else if (params.no_status !== undefined &&
            params.no_status.some(s => !statusList.includes(s))) {
            message = "Le paramètre 'no_status' contient des statuts non reconnus";
        } else if (params.status !== undefined && 
            0 in params.status !== undefined && params.status[0] === '') {
            message = "Le paramètre 'status' ne contient aucun statut";
        } else if (params.status !== undefined &&
            params.status.some(s => !statusList.includes(s))) {
            message = "Le paramètre 'status' contient des statuts non reconnus";
        }

        return message;
    }

    filterTodos(todos, params) {
        todos = todos.filter((todo) => {
            // Max dateEnd
            if (params.max_dateEnd !== undefined) {
                moment(params.max_dateEnd).isAfter(todo.dateEnd);
            }

            // No status
            if (params.no_status !== undefined &&
                params.no_status.some(s => Status[s] === todo.status)) {
                return null;
            }

            // Status
            let isStatusExists = false;
            if (params.status !== undefined &&
                params.status.some(s => Status[s] === todo.status)) {
                isStatusExists = true;
            }
            if (params.status !== undefined && !isStatusExists) {
                return null;
            }

            // tags
            let isTagExists = false;
            if (params.tags !== undefined &&
                params.tags.some(t => todo.tags.includes(t))) {
                    isTagExists = true;
            }
            if (params.tags !== undefined && !isTagExists) {
                return null;
            }

            return todo;
        });

        return todos;
    }
}

const statusList = ["NOT_SPECIFIED", "REQUIRED", "IN_PROGRESS", "COMPLETED", "CANCELLED"];
const todoUtils = new TodoUtils();
export default todoUtils;