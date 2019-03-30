/**
 * This file demonstrates the use of mongodb npm module to
 * establish connection to a mongo db instance and querying data
 */

const express = require('express');
const debug = require('debug')('app:dbRouter');
const dbRouter = express.Router();
const {MongoClient} = require('mongodb');
// the below statement is equivalent to above one. The above one just uses fancy object-destructuring.
// const client = require('mongodb').MongoClient;

// this is the default mongo server url. Can be found in mongo server terminal.
const mongoInstanceUrl = 'mongodb://localhost:27017';
const dbName = 'nodeExpressDb';

dbRouter.route('/users')
    .get((req, res) => {
        (async function mongo(){
            let client;
            try {
                client = await MongoClient.connect(mongoInstanceUrl); 
                debug('Connected to the Mongo Instance on 27017');
                const db = client.db(dbName);
                const response = await(db.collection('users').find().toArray());
                res.json(response);
            } catch(err) {
                debug(err.stack);
            }
            client.close();
        }());
    });

dbRouter.route('/users/:userName')
    .get((req, res) => {
        (async function mongo(){
            let client;
            try {
                client = await MongoClient.connect(mongoInstanceUrl); 
                debug('Connected to the Mongo Instance on 27017');
                const db = client.db(dbName);
                const response = await(db.collection('users').find({name:userName}).toArray());
                res.json(response);
            } catch(err) {
                debug(err.stack);
            }
            client.close();
        }());
    });

    dbRouter.route('/save/user')
    .post((req, res) => {
        (async function mongo(){
            let client;
            try {
                client = await MongoClient.connect(mongoInstanceUrl); 
                debug('Connected to the Mongo Instance on 27017');
                const db = client.db(dbName);
                const response = await(db.collection('users').insert(req.body));
                res.json(response);
            } catch(err) {
                debug(err.stack);
            }
            client.close();
        }());
    });

module.exports = dbRouter;