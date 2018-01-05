/*
@author :abdelhamid.belgacem
*/


const dynalite = require('dynalite');
const AWS = require('aws-sdk');

var dynaliteServer = dynalite({ createTableMs: 50 });

module.exports.stopDB = () => {
    dynaliteServer.close();
};


module.exports.populateFeeds = () => {
    var dynamo = new AWS.DynamoDB.DocumentClient();

    let item = {
        idProfile: "123",
        title: "Title 1",
        description: "Description 1",
        image: "https://s.tmocache.com/images/png/products/phones/Samsung-Galaxy-J3-Prime/250x270_1.png",
        date: "2018-01-04"
    };
    let params = {
        TableName: "Feeds",
        Item: item,
        ReturnConsumedCapacity: "TOTAL"
    };

    let dbPutPromise = dynamo.put(params).promise();

    return dbPutPromise
        .then((data) => {
            console.log(data);
            return item;
        })
        .catch((error) => {
            console.log(error);
            throw error;
        });

}

module.exports.mockDB = () => {
    AWS.config.update({
        region: "eu-central-1",
        endpoint: "http://localhost:8080"
    });

    var dynamodb = new AWS.DynamoDB();
    
    return new Promise((resolve, reject) => {
        dynaliteServer.listen(8080, function (err) {
            dynamodb.listTables({}, function (err, data) {
                if (err) console.log(err, err.stack); // an error occurred
                else {
                    if (data.TableNames.length <= 0) {
                        dynamodb.createTable({
                            TableName: "Feeds",
                            KeySchema: [
                                { AttributeName: "idProfile", KeyType: "HASH" },  //Partition key
                                { AttributeName: "date", KeyType: "RANGE" }
                            ],
                            AttributeDefinitions: [
                                { AttributeName: "idProfile", AttributeType: "S" },
                                { AttributeName: "date", AttributeType: "S" }
                            ],
                            ProvisionedThroughput: {
                                ReadCapacityUnits: 10,
                                WriteCapacityUnits: 10
                            }
                        },
                            function (err, data) {
                                if (err) {
                                    console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
                                    reject(err);
                                } else {
                                    setTimeout(() => {
                                        resolve(data);
                                    }, 1000);
                                }
                            });

                    }
                    else { resolve(); }
                }
            });
        });
    });



    var dynamodb = new AWS.DynamoDB();

    return new Promise((resolve, reject) => {
        dynaliteServer.listen(8080, function (err) {
            dynamodb.listTables({}, function (err, data) {
                if (err) console.log(err, err.stack); // an error occurred
                else {
                    if (data.TableNames.length <= 0) {
                        dynamodb.createTable({
                            TableName: "profiles",
                            KeySchema: [
                                { AttributeName: "shortName", KeyType: "HASH" }  //Partition key
                            ],
                            AttributeDefinitions: [
                                { AttributeName: "shortName", AttributeType: "S" }
                            ],
                            ProvisionedThroughput: {
                                ReadCapacityUnits: 10,
                                WriteCapacityUnits: 10
                            }
                        },
                            function (err, data) {
                                if (err) {
                                    console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
                                    reject(err);
                                } else {
                                    setTimeout(() => {
                                        resolve(data);
                                    }, 1000);
                                }
                            })
                            .then((data) => {


                            });
                    }
                    else { resolve(); }
                }
            });
        });
    });

};