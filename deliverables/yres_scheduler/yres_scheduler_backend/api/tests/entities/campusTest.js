// const Campus = require("../../entities/Campus")
// var assert = require('assert');

// var sample_name = "Campus A";
// var sample_id = "c000000001";
// var sample = new Campus(sample_name, sample_id)
// describe('class Campus', function () {
//   describe('constructor()', function () {
//     it('constructor should return an object', function () {
//       assert.notEqual(sample, undefined);
//     });
//     it('with attributes properly set', function () {
//       assert.equal(sample.name, sample_name);
//       console.log(sample.campusID, sample_id)
//       assert.equal(sample.campusID, sample_id);
//     });
//     it('with sets defined but empty', function() {
//       assert.notEqual(sample.floorPlans, undefined);
//       assert.notEqual(sample.camps, undefined);
//       assert.equal(sample.floorPlans.size, 0);
//       assert.equal(sample.camps.size, 0);
//     });
//     it('get set size methods should return 0', function() {
//       assert.equal(sample.numCamp(), 0);
//       assert.equal(sample.numFloorPlan(), 0);
//     });
//     it('get set size methods should return 1 with new item added', function() {
//       sample.addCamp("dummy");
//       sample.addFloorPlan("dummy");
//       assert.equal(sample.numCamp(), 1);
//       assert.equal(sample.numFloorPlan(), 1);
//     });
//   });
// });
