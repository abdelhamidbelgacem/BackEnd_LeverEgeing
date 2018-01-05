/*
@author :abdelhamid.belgacem

*/


/*global describe, it, before, beforeEach, after, afterEach */

'use strict';

let idProfile="123";
require('dotenv').config({path: './test/.env'});
var TestUtils = require('./testUtils');

var assert = require('chai').assert;
var should = require('chai').should();

var FeedsService;

describe("Feed Service test", () => {

    before( (done) => {
        //this.timeout(50000);
        TestUtils.mockDB()
            .then(function (data) {
                FeedsService = require('../feedsService');
				console.log("OKKKKKK");               
			   done();
            })
            .catch(function (err) {
                assert(false, "Could not get the mock DB");
                done(err);
            });
    });

    after ((done) => {
        TestUtils.stopDB();
        done();
    });


    it('should get a Feed', (done) => {
        let feedsService = new FeedsService();
        feedsService.get("123")
            .then((data) => {
			 console.log("KKKKKKOOOOOOOO"); 
			 assert(data.Count > 0);
			 done();
            })
            .catch((error) => {
                done(error);
            });
    });
    it('should raise an error', (done) => {
        let feedsService = new FeedsService();
		feedsService.get("NOT_EXISTING_PROFILE")
            .then((data) => {
                assert(data.Count == 0);
                done();
            })
            .catch((error) => {
                done();
            });
    });
});
