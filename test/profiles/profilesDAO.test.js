/**
 * @author:Abdelhamid.belgacem
 */


/*global describe, it, before, beforeEach, after, afterEach */

'use strict';

require('dotenv').config({path: '../.env'});
var TestUtils = require('../testUtils');

var assert = require('chai').assert;
var should = require('chai').should();

var ProfilesDAO;

describe("Profile DAO test", () => {

    before( (done) => {
        //this.timeout(50000);
        TestUtils.mockDB()
            .then(function (data) {
                return TestUtils.populateProfiles()
            })
            .then(function (data) {
                ProfilesDAO = require('../../profiles/profilesDAO');
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


    it('should get a Profile list', (done) => {
        let profilesDAO = new ProfilesDAO();
        profilesDAO.get("123")
            .then((data) => {
                assert(data.Count > 0);
                done();
            })
            .catch((error) => {
                done(error);
            });
    });
    it('should get an empty profile list', (done) => {
        let profilesDAO = new ProfilesDAO();
        profilesDAO.get("NOT_EXISTING_PROFILE")
            .then((data) => {
                assert(data.Count == 0);
                done();
            })
            .catch((error) => {
                done(error);
            });
    });
});
