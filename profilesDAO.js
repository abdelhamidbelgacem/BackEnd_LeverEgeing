

/*
@author :abdelhamid.belgacem
*/

'use strict';

const AWS = require('aws-sdk');

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


        UpdateExpression: "set info.rating = :r, info.plot=:p, info.actors=:a",
    ExpressionAttributeValues:{
        ":r":5.5,
        ":p":"Everything happens all at once.",
        ":a":["Larry", "Moe", "Curly"]
    },
    ReturnValues:"UPDATED_NEW"
};

console.log("Updating the item...");



        let params = { 
            TableName: tableName,
            Item: item,
            ConditionExpression: "attribute_not_exists(shortName)",
            ReturnConsumedCapacity: "TOTAL"    
        };


        /**
         * UpdateExpression: "set info.rating = :r, info.plot=:p, info.actors=:a",
    ExpressionAttributeValues:{
        ":r":5.5,
        ":p":"Everything happens all at once.",
        ":a":["Larry", "Moe", "Curly"]
    },
    ReturnValues:"UPDATED_NEW"
};

console.log("Updating the item...");
docClient.update(params, function(err, data) {
    if (err) {
        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
    }
});
         */
        let dbPutPromise = dynamo.update(params).promise();
    
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