/*
@author :abdelhamid.belgacem
*/

'use strict';

const appErrors = require('appErrors');

//const feedsDAO = require('feedsDAO');
let feedsDAO = new feedsDAO();

//const feedsService = require('feedsService');
let feedsService = new feedsService(feedsDAO);

/** POST /feeds handler */
exports.get = (event, context, callback) => {
    feedsService.get(JSON.parse(event.body))
        .then( (item) => {
            callback(
                null, 
                {
                    statusCode: 201,
                    headers: {location: item._links.self.href},
                    body: JSON.stringify(item)
                });
        })
        .catch( (error) => { 
            console.log(error);
            if (error instanceof appErrors.AppError) {
                callback(
                    null, 
                    {
                        statusCode: error.status,
                        body: error.errorList || error.message
                    });
            }
            callback(error);
        });
};