/**
 * This is a npm module which helps us make http call. This is basically 
 * an alternative to the traditional http library as used in angular.
 */
const axios = require('axios');

/**
 * This is a npm module which helps us to transform XML based SOAP response
 * of an API to JSON response.
 */
const xml2js = require('xml2js');

/**
 * We get a parser out of xml2js. By default it parse the whole response body
 * in an explicit array. So we prevent that setting it to false. The github API
 * used here provides JSON response by default, so we won't use it. This is 
 * however very helpful when working with API like Goodreads which return SOAP
 * based XML response.
 */
const parser = xml2js.Parser({explictArray : false});
const debug = require('debug')('app:gitService');

const GET_USERS_URL = 'https://api.github.com/users';
const GET_USER_BY_ID_URL = 'https://api.github.com/users/:userName';

function githubService(){
    function getUsers() {
        debug('Arrived in service');
        return new Promise((resolve, reject) => {
            axios.get(GET_USERS_URL)
            .then((response) => {
                // below way can be used to use parser in SOAP based XML response.
                // parser.parseString(response.data, (err, result) => {
                //     if(err) {
                //         do some logging here        
                //     } else {
                //         resolve(reponse);
                //     }
                // });
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            })
        })
    }

    function getUserById(userName) {
        return new Promise((resolve, reject) => {
            axios.get(GET_USER_BY_ID_URL.replace(':userName', userName))
            .then((response) => {
                // below way can be used to use parser in SOAP based XML response.
                // parser.parseString(response.data, (err, result) => {
                //     if(err) {
                //         do some logging here        
                //     } else {
                //         resolve(reponse);
                //     }
                // });
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            })
        })
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
module.exports = githubService();