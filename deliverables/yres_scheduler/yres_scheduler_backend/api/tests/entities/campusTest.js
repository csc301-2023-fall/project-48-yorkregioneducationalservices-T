 /*
 const Campus = require("../../entities/Campus")
 var assert = require('assert');

 var sample_name = "Campus A";
 var sample_id = "c000000001";
 var sample = new Campus(sample_name, sample_id, new Set(), new Set());
 describe('class Campus', function () {
   describe('constructor()', function () {
     it('constructor should return an object', function () {
       assert.notEqual(sample, undefined);
     });
     it('with attributes properly set', function () {
       assert.equal(sample.name, sample_name);
       console.log(sample.campusID, sample_id)
       assert.equal(sample.campusID, sample_id);
     });
     it('with sets defined and with same content (empty)', function() {
       assert.notEqual(sample.camp_ids, undefined);
       assert.notEqual(sample.room_ids, undefined);
       assert.equal(sample.camp_ids.size, 0);
       assert.equal(sample.room_ids.size, 0);
     });
     it('get set size methods should return sample size (0)', function() {
       assert.equal(sample.numCamps(), 0);
       assert.equal(sample.numRooms(), 0);
     });
     it('get set size methods should return 1 more than sample size (1) with new item added', function() {
       sample.addCamp("dummy");
       sample.addRoom("dummy");
       assert.equal(sample.numCamps(), 1);
       assert.equal(sample.numRooms(), 1);
     });
     it('get array methods should return arrays with length 1 more than sample size (1)', function() {
       assert.equal(sample.getCampIds().length, 1);
       assert.equal(sample.getRoomIds().length, 1);
     });
   });
 });
*/