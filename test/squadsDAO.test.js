'use strict';

require('dotenv').config({path: './test/.env'});
var TestUtils = require('./testUtils');

var assert = require('chai').assert;
var should = require('chai').should();

var SquadsDAO;

describe("Squad DAO test", () => {

    before( (done) => {
        //this.timeout(50000);
        TestUtils.mockDB()
            .then(function (data) {
                SquadsDAO = require('../squadsDAO');
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


    it('should save a squad', (done) => {
        let squadsDAO = new SquadsDAO();
        squadsDAO.post({
            shortName: 'CTE',
            name: 'Core team'
        })
            .then((data) => {
                done();
            })
            .catch((error) => {
                done(error);
            });
    });
    it('should raise an error', (done) => {
        let squadsDAO = new SquadsDAO();
        squadsDAO.post({
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