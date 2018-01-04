/*
@author :abdelhamid.belgacem
*/


const dynalite = require('dynalite');
const AWS = require('aws-sdk');

var dynaliteServer = dynalite({ createTableMs: 50 });

module.exports.stopDB = () => {
    dynaliteServer.close();
};

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
                            });
                    }
                    else { resolve(); }
                }
            });
        });
    });
};