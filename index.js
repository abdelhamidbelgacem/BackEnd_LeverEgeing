/*
@author :abdelhamid.belgacem
*/

'use strict';
/*******
Feeds
*******/

const appErrors = require('./appErrors');

const FeedsDAO = require('./feedsDAO');
let feedsDAO = new FeedsDAO();

const FeedsService = require('./feedsService');
let feedsService = new FeedsService(feedsDAO);

/** GET /feeds handler */
exports.get = (event, context, callback) => {
    feedsService.get(JSON.parse(event.body))
        .then( (item) => {
			console.log("##########VERIFY LAMBDA",item);
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
				console.log("##########ERROR",item);
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


