/**
 * @author:Abdelhamid.belgacem
 */


'use strict';

const AWS = require('aws-sdk');

const dynamo = new AWS.DynamoDB.DocumentClient();

const tableName = process.env.PROFILES_TABLE_NAME;

class profilesDAO {
    constructor() {
    }

    /**
     * Saves a new profile User
     * Update Profile User
     * @param {*} profile  
     */
    post(profile) {
        var _self = this;
        
        let item = profile;

        let params = { 
            TableName: tableName,
            Item: item
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

    update(idProfile) {

       let info =  
       {
        idProfile: "124",
        civilite: "Mlle",
        name: "Dimitry",
        surname: "Belgacem",
        email:"dimitry.belgacem@ifsalpha.com",
        photo : "https://s.tmocache.com/images/png/products/phones/Samsung-Galaxy-J3-Prime/250x270_1.png",
        birthdate: "1970-04-30",
        adressePostale:"28,rue de Jean Jacques Rouseaux 93190 Bourget Saint denis Paris Françe",
        role:"SENIOR"
    }

        AWS.config.update({
            region: "eu-central-1",
            endpoint: "http://localhost:8000"
          });
        var _self = this;
        // Update the item, unconditionally,
        var params = {
            TableName:tableName,
            UpdateExpression: "set info.civilite = :r, info.name= :p, info.email= :a,info.birthdate= :c,info.adressePostale= :d,info.role= :f",
            ExpressionAttributeValues:{
                ":r":"Mlle",
                ":p":"Christine",
                ":a":"Roucha.lamidel@ifsalpha.com",
                ":c":"1980-04-30",
                ":d":"158,rue de Balzac Jacques Rouseaux / Sur seine  93190 Bourget Saint denis Paris Françe",
                ":f":"COREGIVER_SENIOR",
            },
            ReturnValues:"UPDATED_NEW"
        };
        
        console.log("Updating the Profile User into Dynamo DB Databse...");
        dynamo.update(params, function(err, data) {
            if (err) {
                console.error("Unable to update Profile User. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("Update Profile User succeeded:", JSON.stringify(data, null, 2));
            }
        });
    }
}
module.exports = profilesDAO;