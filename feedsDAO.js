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
       get(idProfile) {
        var _self = this;
        let item = idProfile;
        let params = { 
            TableName: tableName,
            ConsistentRead:"true",
            Item: item,
            ConditionExpression: "attribute_not_exists(shortName)",
            ReturnConsumedCapacity: "TOTAL"  , 
           // Select: ALL_ATTRIBUTES ,
            IndexName: "FeedIndex",
            ProjectionExpression: "idProfile, date", 
            ScanIndexForward: "false",
            Limit:5
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