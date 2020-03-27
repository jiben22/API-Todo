/* jshint esversion: 6 */

import constants from './constants';
import redis from 'redis';
import Todo from '../model/todo';

// Create client
var client = redis.createClient();

client.on('connect', function() {
    console.log('Redis client connected');
});
client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

// Create data
let todo1 = new Todo("TP1", "2020-03-25", "2020-03-26", constants.statut.COMPLETED, ["travail", "web"]);
let todo2 = new Todo("Projet", "2020-03-25", "2020-04-03", constants.statut.IN_PROGRESS, ["travail", "web"]);

// Insert data
client.hset('todo', todo1.id, JSON.stringify(todo1), redis.print);
client.hset('todo', todo2.id, JSON.stringify(todo2), redis.print);

export default client;