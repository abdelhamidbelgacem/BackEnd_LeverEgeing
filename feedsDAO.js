

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
     * Saves a new feed
     * @param {*} feed 
     */
    get(feed) {
        var _self = this;
        
        let item = feed;

        let params = { 
            TableName: tableName,
            Item: item,
            ConditionExpression: "attribute_not_exists(shortName)",
            ReturnConsumedCapacity: "TOTAL"    
        };

        let dbPutPromise = dynamo.put(params).promise();
    
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