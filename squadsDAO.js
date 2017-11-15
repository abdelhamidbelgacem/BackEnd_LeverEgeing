'use strict';

const AWS = require('aws-sdk');

const dynamo = new AWS.DynamoDB.DocumentClient();

const tableName = process.env.SQUADS_TABLE_NAME;

class SquadsDAO {
    constructor() {
    }

    post(squad) {
        var _self = this;
        
        let item = squad;

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

module.exports = SquadsDAO;