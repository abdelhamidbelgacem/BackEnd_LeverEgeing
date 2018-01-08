/**
 * @author:Abdelhamid.belgacem
 */


const dynalite = require('dynalite');
const AWS = require('aws-sdk');

var dynaliteServer = dynalite({ createTableMs: 50 });

module.exports.stopDB = () => {
    dynaliteServer.close();
};


module.exports.populateFeeds = () => {
    var dynamo = new AWS.DynamoDB.DocumentClient();

    let item = 
    [
    
        {
        idProfile: "123",
        title: "Title 1",
        description: "Description 1",
        image: "https://s.tmocache.com/images/png/products/phones/Samsung-Galaxy-J3-Prime/250x270_1.png",
        date: "2018-01-04"
        },
        {
            idProfile: "123",
            title: "Title 1",
            description: "Description 1",
            image: "https://s.tmocache.com/images/png/products/phones/Samsung-Galaxy-J3-Prime/250x270_1.png",
            date: "2018-01-04"
        },
        {
            idProfile: "123",
            title: "Title 1",
            description: "Description 1",
            image: "https://s.tmocache.com/images/png/products/phones/Samsung-Galaxy-J3-Prime/250x270_1.png",
            date: "2018-01-04"
        },
        {
            idProfile: "123",
            title: "Title 1",
            description: "Description 1",
            image: "https://s.tmocache.com/images/png/products/phones/Samsung-Galaxy-J3-Prime/250x270_1.png",
            date: "2018-01-04"
        },
        {
            idProfile: "123",
            title: "Title 1",
            description: "Description 1",
            image: "https://s.tmocache.com/images/png/products/phones/Samsung-Galaxy-J3-Prime/250x270_1.png",
            date: "2018-01-04"
        },
        {
            idProfile: "123",
            title: "Title 1",
            description: "Description 1",
            image: "https://s.tmocache.com/images/png/products/phones/Samsung-Galaxy-J3-Prime/250x270_1.png",
            date: "2018-01-04"
        }

    
    ]
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
                                    console.error("Unable to create table Feeds. Error JSON:", JSON.stringify(err, null, 2));
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

   
    module.exports.populateProfiles = () => {
        var dynamo = new AWS.DynamoDB.DocumentClient();
    
        let item =
        [
        {
            idProfile: "124",
            civilite: "M",
            name: "Nouri",
            surname: "Abdelhamid",
            email:"abdelhamid.nouri@ifsalpha.com",
            photo : "https://s.tmocache.com/images/png/products/phones/Samsung-Galaxy-J3-Prime/250x270_1.png",
            birthdate: "1990-04-30",
            adressePostale:"23,rue de Rulhière 93150 Blanc Mesnil Saint denis Paris Françe",
            role:"CareGiver"
        },
        {
            idProfile: "125",
            civilite: "M",
            name: "Nouri",
            surname: "Abdelhamid",
            email:"abdelhamid.nouri@ifsalpha.com",
            photo : "https://s.tmocache.com/images/png/products/phones/Samsung-Galaxy-J3-Prime/250x270_1.png",
            birthdate: "1990-04-30",
            adressePostale:"23,rue de Rulhière 93150 Blanc Mesnil Saint denis Paris Françe",
            role:"CareGiver"
        },
        {
            idProfile: "126",
            civilite: "M",
            name: "Nouri",
            surname: "Abdelhamid",
            email:"abdelhamid.nouri@ifsalpha.com",
            photo : "https://s.tmocache.com/images/png/products/phones/Samsung-Galaxy-J3-Prime/250x270_1.png",
            birthdate: "1990-04-30",
            adressePostale:"23,rue de Rulhière 93150 Blanc Mesnil Saint denis Paris Françe",
            role:"CareGiver"
        },
        {
            idProfile: "127",
            civilite: "M",
            name: "Nouri",
            surname: "Abdelhamid",
            email:"abdelhamid.nouri@ifsalpha.com",
            photo : "https://s.tmocache.com/images/png/products/phones/Samsung-Galaxy-J3-Prime/250x270_1.png",
            birthdate: "1990-04-30",
            adressePostale:"23,rue de Rulhière 93150 Blanc Mesnil Saint denis Paris Françe",
            role:"CareGiver"
        },
        {
            idProfile: "128",
            civilite: "M",
            name: "Nouri",
            surname: "Abdelhamid",
            email:"abdelhamid.nouri@ifsalpha.com",
            photo : "https://s.tmocache.com/images/png/products/phones/Samsung-Galaxy-J3-Prime/250x270_1.png",
            birthdate: "1990-04-30",
            adressePostale:"23,rue de Rulhière 93150 Blanc Mesnil Saint denis Paris Françe",
            role:"CareGiver"
        },
        {
            idProfile: "129",
            civilite: "M",
            name: "Nouri",
            surname: "Abdelhamid",
            email:"abdelhamid.nouri@ifsalpha.com",
            photo : "https://s.tmocache.com/images/png/products/phones/Samsung-Galaxy-J3-Prime/250x270_1.png",
            birthdate: "1990-04-30",
            adressePostale:"23,rue de Rulhière 93150 Blanc Mesnil Saint denis Paris Françe",
            role:"CareGiver"
        },
        {
            idProfile: "130",
            civilite: "M",
            name: "Nouri",
            surname: "Abdelhamid",
            email:"abdelhamid.nouri@ifsalpha.com",
            photo : "https://s.tmocache.com/images/png/products/phones/Samsung-Galaxy-J3-Prime/250x270_1.png",
            birthdate: "1990-04-30",
            adressePostale:"23,rue de Rulhière 93150 Blanc Mesnil Saint denis Paris Françe",
            role:"CareGiver"
        },
        {
            idProfile: "131",
            civilite: "M",
            name: "Nouri",
            surname: "Abdelhamid",
            email:"abdelhamid.nouri@ifsalpha.com",
            photo : "https://s.tmocache.com/images/png/products/phones/Samsung-Galaxy-J3-Prime/250x270_1.png",
            birthdate: "1990-04-30",
            adressePostale:"23,rue de Rulhière 93150 Blanc Mesnil Saint denis Paris Françe",
            role:"CareGiver"
        },
        {
            idProfile: "132",
            civilite: "M",
            name: "Nouri",
            surname: "Abdelhamid",
            email:"abdelhamid.nouri@ifsalpha.com",
            photo : "https://s.tmocache.com/images/png/products/phones/Samsung-Galaxy-J3-Prime/250x270_1.png",
            birthdate: "1990-04-30",
            adressePostale:"23,rue de Rulhière 93150 Blanc Mesnil Saint denis Paris Françe",
            role:"CareGiver"
        },
        {
            idProfile: "133",
            civilite: "M",
            name: "Nouri",
            surname: "Abdelhamid",
            email:"abdelhamid.nouri@ifsalpha.com",
            photo : "https://s.tmocache.com/images/png/products/phones/Samsung-Galaxy-J3-Prime/250x270_1.png",
            birthdate: "1990-04-30",
            adressePostale:"23,rue de Rulhière 93150 Blanc Mesnil Saint denis Paris Françe",
            role:"CareGiver"
        },
        {
            idProfile: "134",
            civilite: "M",
            name: "Nouri",
            surname: "Abdelhamid",
            email:"abdelhamid.nouri@ifsalpha.com",
            photo : "https://s.tmocache.com/images/png/products/phones/Samsung-Galaxy-J3-Prime/250x270_1.png",
            birthdate: "1990-04-30",
            adressePostale:"23,rue de Rulhière 93150 Blanc Mesnil Saint denis Paris Françe",
            role:"CareGiver"
        }
    ]
        let params = {
            TableName: "Profiles",
            Item: item
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

    var dynamodb = new AWS.DynamoDB();

    return new Promise((resolve, reject) => {
        dynaliteServer.listen(8080, function (err) {
            dynamodb.listTables({}, function (err, data) {
                if (err) console.log(err, err.stack); // an error occurred
                else {
                    if (data.TableNames.length <= 0) {
                        dynamodb.createTable({
                            TableName: "Profiles",
                            KeySchema: [
                                { AttributeName: "idProfile", KeyType: "HASH" },  //Partition key
                                { AttributeName: "email", KeyType: "RANGE" }
                            ],
                            AttributeDefinitions: [
                                { AttributeName: "idProfile", AttributeType: "S" },
                                { AttributeName: "email", AttributeType: "S" }
                            ],
                            ProvisionedThroughput: {
                                ReadCapacityUnits: 10,
                                WriteCapacityUnits: 10
                            }
                        },
                            function (err, data) {
                                if (err) {
                                    console.error("Unable to create table Profiles. Error JSON:", JSON.stringify(err, null, 2));
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

    /**
     * Update User Profile Into Database
     */


    module.exports.populateProfiles = () => {
        var dynamo = new AWS.DynamoDB.DocumentClient();
    
        let item =
        [
        {
            idProfile: "124",
            civilite: "Mlle",
            name: "Nouri_Abdelhamid",
            surname: "Abdelhamid_Dimetri",
            email:"abdelhamid.nouri_Google@ifsalpha.com",
            photo : "https://s.tmocache.com/images/png/products/phones/Samsung-Galaxy-J3-Prime/250x270_1.png",
            birthdate: "1960-04-30",
            adressePostale:"178,rue de Rulhière 93150 Blanc Mesnil Saint denis Paris Françe",
            role:"CareGiver/SENIOR"
        }
        ]
        let params = {
            TableName: "Profiles",
            Item: item,
        };
        console.log("##############Updating the Profile User into Dynamo DB Databse.....");
        
        dynamo.update(params, function(err, data) {
            if (err) {
                console.error("Unable to update Profile User. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("Update Profile User succeeded:", JSON.stringify(data, null, 2));
            }
        });
    
    }
};