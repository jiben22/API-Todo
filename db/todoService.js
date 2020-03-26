/* jshint esversion: 6 */

import client from './client';

var hash = Object.freeze('todo');

class TodoService {

    // GET a specific todo
    findById(id, callback) {
        if (this.exists(id)) {
            client.hget(hash, id, function (err, todo) {
                if (err) throw err;
                console.log("TRY -> " + todo);
                callback(JSON.parse(todo));
            });
        } else {
            callback(null);
        }
    }

    // CREATE a todo
    add(title, description, callback) {
        const todo = {
            title: title,
            description: description,
        };

        client.hset(hash, client.length+1, JSON.stringify(todo));
        callback(todo);
    }

    // DELETE a specific todo
    delete(id, callback) {
        if (this.exists(id)) {
            client.hdel(hash, id, function (err, reply) {
                if (err) throw err;
                if (reply === 1) {
                    console.log(hash + ' ' + id + ' deleted');
                } else {
                    console.log(hash + ' ' + id + ' hasn\'t been deleted');
                }
                callback(reply);
            });
        }
    }

    // CHECKS if the todo exists
    exists(id) {
        return client.hexists(hash, id, function (err, reply) {
            if (err) throw err;
            if (reply === 1) {
                console.log(hash + ' ' + id + ' exists');
            } else {
                console.log(hash + ' ' + id + ' doesn\'t exist');
            }
            return reply;
        });
    }
}

const todoService = new TodoService();
export default todoService;