/* jshint esversion: 6 */

import redis from 'redis';
import Status from '../model/status';
import Todo from '../model/todo';
import Tag from '../model/tag';

// Create client
var client = redis.createClient();

client.on('connect', function() {
    console.log('Redis client connected');
});
client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

export default client;

/**
 * Create fake data
 */
// Tags
let tag1 = new Tag("Travail");
let tag2 = new Tag("Web");
let tag3 = new Tag("Youpi");
// Todos
let todo1 = new Todo("TP1", "25/03/2020", "26/03/2020", Status.COMPLETED, [tag1.title, tag2.title]);
let todo2 = new Todo("Projet", "25/03/2020", "03/04/2020", Status.IN_PROGRESS, [tag1.title, tag2.title, tag3.title]);

// Insert data
client.hset('tag', tag1.id, JSON.stringify(tag1), redis.print);
client.hset('tag', tag2.id, JSON.stringify(tag2), redis.print);
client.hset('tag', tag3.id, JSON.stringify(tag3), redis.print);
client.hset('todo', todo1.id, JSON.stringify(todo1), redis.print);
client.hset('todo', todo2.id, JSON.stringify(todo2), redis.print);