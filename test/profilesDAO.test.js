/*
@author :abdelhamid.belgacem

*/



/*global describe, it, before, beforeEach, after, afterEach */


'use strict';

require('dotenv').config({path: './test/.env'});
var TestUtils = require('./testUtils');

var assert = require('chai').assert;
var should = require('chai').should();

var ProfilesDAO;

describe("Profile DAO test", () => {

    before( (done) => {
        //this.timeout(50000);
        TestUtils.mockDB()
            .then(function (data) {
                ProfilesDAO = require('../ProfilesDAO');
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


    it('should save a Profile', (done) => {
        let profilesDAO = new ProfilesDAO();
        profilesDAO.post({
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
        let profilesDAO = new ProfilesDAO();
        profilesDAO.post({
            shortName: 'CTE',
            name: 'LVA team'
        })
            .then((data) => {
                done("The LVA team already exists, it should not be saved");
            })
            .catch((error) => {
                done();
            });
    });
});
