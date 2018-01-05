

/*
@author :abdelhamid.belgacem
*/


'use strict';

const  AWS = require('aws-sdk');

const dynamo = new AWS.DynamoDB.DocumentClient();

const tableName = process.env.PROFILES_TABLE_NAME;

class profilesDAO {
    constructor() {
    }

    /**
     * Saves a new profile
     * @param {*} profile 
     */
    post(profile) {
        var _self = this;
        
        let item = profile;

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
	 patch(profile) {
        var _self = this;
        
        let item = profile;

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
module.exports = profilesDAO;