/**
 * @author:Abdelhamid.belgacem
 */

'use strict';
/**
 * Feeds
**/

const appErrors = require('./appErrors');

const FeedsDAO = require('./feeds/feedsDAO');
let feedsDAO = new FeedsDAO();

const FeedsService = require('./feeds/feedsService');
let feedsService = new FeedsService(feedsDAO);

/**
 *Profile
 **/

const ProfilesDAO = require('./profiles/profilesDAO');
let profilesDAO = new ProfilesDAO();

const ProfilesService = require('./profiles/profilesService');
let profilesService = new ProfilesService(profilesDAO);



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
},

exports.post = (event, context, callback) => {
    profileService.post(JSON.parse(event.body))
        .then( (item) => {
			console.log("##########VERIFY LAMBDA CREATE USER PROFILE",item);
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
},
exports.update = (event, context, callback) => {
    profileService.update(JSON.parse(event.body))
        .then( (item) => {
			console.log("##########VERIFY LAMBDA UPDATE INFORMATIONS PROFILE",item);
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