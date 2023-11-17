/*
const Group = require("../../entities/Group")
var assert = require('assert');

var sample_groupID = "g000000001";
var sample_scheduleID = "s000000001";
var sample_campID = "c000000001";
var sample = new Group(sample_groupID, sample_scheduleID, new Set(), new Set(), sample_campID);
describe('class Group', function () {
  describe('constructor()', function () {
    it('constructor should return an object', function () {
      assert.notEqual(sample, undefined);
    });
    it('with attributes properly set', function () {
      assert.equal(sample.group_id, sample_groupID);
      assert.equal(sample.schedule_id, sample_scheduleID);
      assert.equal(sample.camp_id, sample_campID);
    });
    it('with sets defined and with same content (empty)', function() {
      assert.notEqual(sample.student_ids, undefined);
      assert.equal(sample.counselor_ids.size, 0);
    });
    it('get set size methods should return sample size (0)', function() {
      assert.equal(sample.numStudents(), 0);
      assert.equal(sample.numCounselors(), 0);
    });
    it('get set size methods should return 1 more than sample size (1) with new item added', function() {
      sample.addStudents("dummy");
      sample.addCounselor("dummy");
      assert.equal(sample.numStudents(), 1);
      assert.equal(sample.numCounselors(), 1);
    });
    it('get array methods should return arrays with length 1 more than sample size (1)', function() {
      assert.equal(sample.getStudentIds().length, 1);
      assert.equal(sample.getCounselorIds().length, 1);
    });
  });
});
*/