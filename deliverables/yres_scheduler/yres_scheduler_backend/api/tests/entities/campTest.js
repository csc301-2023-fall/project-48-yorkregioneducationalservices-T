 /*
 const Camp = require("../../entities/Camp")
 var assert = require('assert');

 var sample_campID = "c000000001";
 var sample_name = "Camp A";
 var sample_campusID = "c000000002";
 var sample = new Camp(sample_campID, sample_name, new Set(), sample_campusID);
 describe('class Camp', function () {
   describe('constructor()', function () {
     it('constructor should return an object', function () {
       assert.notEqual(sample, undefined);
     });
     it('with attributes properly set', function () {
       assert.equal(sample.camp_id, sample_campID);
       assert.equal(sample.name, sample_name);
       assert.equal(sample.campus_id, sample_campusID);
     });
     it('with sets defined and with same content (empty)', function() {
       assert.notEqual(sample.activity_ids, undefined);
       assert.equal(sample.activity_ids.size, 0);
     });
     it('get set size methods should return sample size (0)', function() {
       assert.equal(sample.numActivities(), 0);
     });
     it('get set size methods should return 1 more than sample size (1) with new item added', function() {
       sample.addActivity("dummy");
       assert.equal(sample.numActivities(), 1);
     });
     it('get array methods should return arrays with length 1 more than sample size (1)', function() {
       assert.equal(sample.getActivityIds().length, 1);
     });
   });
 });
*/