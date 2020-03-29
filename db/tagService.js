/* jshint esversion: 6 */

import client from './client';

var hash = Object.freeze('tag');

class TagService {

    // GET tags
    findAll(callback) {
        let tagList = [];

        client.hgetall(hash, function (err, tags) {
            if (err) throw err;
            if (tags != null) {
                for (var key of Object.keys(tags)) {
                    tagList.push(JSON.parse(tags[key]));
                }
            }
            callback(tagList);
        });
    }

    // GET a specific tag
    findById(id, callback) {
        if (this.exists(id)) {
            client.hget(hash, id, function (err, tag) {
                if (err) throw err;
                callback(JSON.parse(tag));
            });
        } else {
            callback(null);
        }
    }

    // CREATE a tag
    add(tag, callback) {
        this.findAll(function (tags) {
            if (!tags.some(t => t.title.includes(tag.title))) {
                client.hset(hash, tag.id, JSON.stringify(tag));
                callback(tag);
            } else {
                callback(null);
            }
        });
    }

    // UPDATE a specific tag
    update(id, tag, callback) {
        client.hset(hash, id, JSON.stringify(tag));
        callback(tag);
    }

    // DELETE a specific tag
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

    // CHECKS if the tag exists
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

const tagService = new TagService();
export default tagService;