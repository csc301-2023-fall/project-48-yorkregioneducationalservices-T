const Camp = require("../../entities/Camp")
var assert = require('assert');

var sample_age_type = 0;
var sample_campID = "c000000001";
var sample = new Camp(sample_age_type, sample_campID)
describe('class Camp', function () {
  describe('constructor()', function () {
    it('constructor should return an object', function () {
      assert.notEqual(sample, undefined);
    });
    it('with attributes properly set', function () {
      assert.equal(sample.age_type, sample_age_type);
      assert.equal(sample.campID, sample_campID);
    });
    it('with sets defined but empty', function() {
      assert.notEqual(sample.students, undefined);
      assert.notEqual(sample.counselors, undefined);
      assert.equal(sample.students.size, 0);
      assert.equal(sample.counselors.size, 0);
    });
    it('get set size methods should return 0', function() {
      assert.equal(sample.numStudents(), 0);
      assert.equal(sample.numCounselors(), 0);
    });
    it('get set size methods should return 1 with new item added', function() {
      sample.addStudents("dummy");
      sample.addCounselor("dummy");
      assert.equal(sample.numStudents(), 1);
      assert.equal(sample.numCounselors(), 1);
    });
  });
});
