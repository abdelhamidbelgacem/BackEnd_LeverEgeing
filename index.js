'use strict';

const appErrors = require('appErrors');

const SquadsDAO = require('squadsDAO');
let squadsDAO = new SquadsDAO();

const SquadsService = require('squadsService');
let squadsService = new SquadsService(squadsDAO);

exports.post = (event, context, callback) => {
    squadsService.post(JSON.parse(event.body))
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