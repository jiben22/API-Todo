/* jshint esversion: 6 */

import client from './client';

var hash = Object.freeze('todo');

class TodoService {

    // GET todos
    findAll(callback) {    
        let todoList = [];

        client.hgetall(hash, function(err, todos) {
            if (err) throw err;
            if (todos != null) {
                for (var key of Object.keys(todos)) {
                    todoList.push(JSON.parse(todos[key]));
                }
            }
            callback(todoList);
        });
    }

    // GET a specific todo
    findById(id, callback) {
        if (this.exists(id)) {
            client.hget(hash, id, function (err, todo) {
                if (err) throw err;
                callback(JSON.parse(todo));
            });
        } else {
            callback(null);
        }
    }

    // CREATE a todo
    add(todo, callback) {
        client.hset(hash, todo.id, JSON.stringify(todo));
        callback(todo);
    }

    // UPDATE a specific todo
    update(id, todo, callback) {
        client.hset(hash, id, JSON.stringify(todo));
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