/* jshint esversion: 6 */

import constants from './constants';
import redis from 'redis';

// Create client
var client = redis.createClient();

client.on('connect', function() {
    console.log('Redis client connected');
});
client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

// Create data
let todo1 = {
    title: "TP1", 
    dateBegin: "25/03/2020", 
    dateEnd: "26/03/2020", 
    statut: constants.statut.COMPLETED, 
    tags: ["travail", "web"]
};

let todo2 = {
    title: "Projet", 
    dateBegin: "25/03/2020", 
    dateEnd: "03/01/2020", 
    statut: constants.statut.IN_PROGRESS,
    tags: ["travail", "web"]
};

// Insert data
client.hset('todo', 1, JSON.stringify(todo1), redis.print);
client.hset('todo', 2, JSON.stringify(todo2), redis.print);

export default client;