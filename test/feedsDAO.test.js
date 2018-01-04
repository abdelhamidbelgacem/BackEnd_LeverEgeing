/*
@author :abdelhamid.belgacem

*/


/*global describe, it, before, beforeEach, after, afterEach */

'use strict';

require('dotenv').config({path: './test/.env'});
var TestUtils = require('./testUtils');

var assert = require('chai').assert;
var should = require('chai').should();

var FeedsDAO;

describe("Feed DAO test", () => {

    before( (done) => {
        //this.timeout(50000);
        TestUtils.mockDB()
            .then(function (data) {
                FeedsDAO = require('../FeedsDAO');
                done();
            })
            .catch(function (err) {
                assert(false, "Could not create the mock DB");
                done(err);
            });
    });

    after ((done) => {
        TestUtils.stopDB();
        done();
    });


    it('should save a Feed', (done) => {
        let FeedsDAO = new FeedsDAO();
        FeedsDAO.get({
            shortName: 'CTE',
            name: 'LVA Team'
        })
            .then((data) => {
                done();
            })
            .catch((error) => {
                done(error);
            });
    });
    it('should raise an error', (done) => {
        let FeedsDAO = new FeedsDAO();
        FeedsDAO.post({
            shortName: 'CTE',
            name: 'Core team'
        })
            .then((data) => {
                done("The team already exists, it should not be saved");
            })
            .catch((error) => {
                done();
            });
    });
});
