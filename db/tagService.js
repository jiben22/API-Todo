/* jshint esversion: 6 */

import client from './client';

var hash = Object.freeze('tag');

class TagService {

    delele(id) {
        if(this.exists(id)) {
            client.hdel(hash, id, function(err, reply) {
                if (err) throw err;
                if (reply === 1) {
                    console.log(hash + ' ' + id + ' deleted');
                } else {
                    console.log(hash + ' ' + id + ' hasn\'t been deleted');
                }
            });
        }
    }

    exists(id) {
        return client.hexists(hash, id, function(err, reply) {
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