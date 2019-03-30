const bookService = require('../services/gitService');
const debug = require('debug')('app:gitController');

function gitController() {
    function getUsers(req, res) {
        debug('Arrived in controller');
        (async function getUsers(){
            const users =  await bookService.getUsers();
            res.json(users);
        }());
    }
    function getUserById (req, res) {
        (async function getUsers(){
            const userName = req.params.userName;
            const user = await bookService.getUserById(userName);
            res.json(user);
        }());
    }

    return {
        getUsers,
        getUserById
    }
}

/**
 * You can either call the function here so that this file, when required
 * gives you an object of different functions here or you can also call this
 * function while requiring it i.e.
 * const {getUsers, getUserById} = require('path-of-this-file')();
 */
module.exports = gitController();
