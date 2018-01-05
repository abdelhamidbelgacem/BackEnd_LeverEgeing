/*
@author :abdelhamid.belgacem
*/


'use strict';

const AWS = require('aws-sdk');

const dynamo = new AWS.DynamoDB.DocumentClient();

const tableName = process.env.FEEDS_TABLE_NAME;

class feedsDAO {
    constructor() {
    }

    /**
     * Get feed related to a profile
     * @param {*} idProfile the profile for which we want the feed
     */
       get(idProfile) {
        var _self = this;

        let params = { 
            TableName: tableName,
            KeyConditionExpression : '#idProfile = :idProfile',
            ExpressionAttributeValues: {
                ':idProfile': idProfile
            },
            ExpressionAttributeNames: {
                '#idProfile' : 'idProfile'
            }
        };

        let dbPutPromise = dynamo.query(params).promise();
    
        return dbPutPromise
            .then( (data) => {
                console.log(data);
                return data;
            })
            .catch( (error) => { 
                console.log(error);
                throw error;
            });
    }
}

module.exports = feedsDAO;