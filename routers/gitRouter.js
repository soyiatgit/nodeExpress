const express = require('express');
const gitRouter = express.Router();
const gitData = require('../data/gitData').gitUsersList;
const gitController  = require('../controllers/gitController');

/**
 * the commented code below works fine. I coded that earlier while
 * working with the dummy data. The new code below is integrated with
 * api.github.com
 */
// gitRouter.route('/users')
//     .get((req, res) => {
//         res.json(gitData);
//     });

// gitRouter.route('/users/:userName')
//     .get((req, res) => {
//     const userName = req.params.userName;
//     const user = gitData.filter((user) => {
//         return user.userName === userName;
//     });
//     res.json(user);
//     })
//     .post((req, res) => {
//         // do any post logic here.
//     });

/**
 * the below code demonstrates the usage of controllers and 
 * services to integrate the APIs.
 */
gitRouter.route('/users')
    .get(gitController.getUsers);

gitRouter.route('/users/:userName')
    .get(gitController.getUserById);

module.exports = gitRouter;