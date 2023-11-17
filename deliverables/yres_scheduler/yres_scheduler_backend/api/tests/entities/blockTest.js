/*
const Block = require("../../entities/Block")
var assert = require('assert');

var sample_blockID = "b000000001";
var sample_scheduleID = "s000000001";
var sample_roomID = "r000000001";
var sample_activityID = "a000000001";
var sample_startTime = new Date(2023, 1, 1, 8, 0);
var sample_endTime = new Date(2023, 1, 1, 9, 0);
var sample = new Block(sample_blockID, sample_scheduleID, sample_roomID, sample_activityID, sample_startTime, sample_endTime);
describe('class Block', function () {
  describe('constructor()', function () {
    it('constructor should return an object', function () {
      assert.notEqual(sample, undefined);
    });
    it('with attributes properly set', function () {
      assert.equal(sample.group_id, sample_blockID);
      assert.equal(sample.schedule_id, sample_scheduleID);
      assert.equal(sample.room_id, sample_roomID);
      assert.equal(sample.activity_id, sample_activityID);
    });
    it('with times defined', function() {
      assert.notEqual(sample.start_time, undefined);
      assert.notEqual(sample.end_time, undefined);
    });
    it('get time string methods methods should return defined string', function() {
      assert.notEqual(sample.getStartTime(), undefined);
      assert.notEqual(sample.getEndTime(), undefined);
    });
  });
});
*/
