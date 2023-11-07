const ScheduleBlock = require("../../entities/ScheduleBlock")
var assert = require('assert');

var sample_activity = "dummy";
var sample_start_time = "09:10";
var sample_end_time = "10:00";
var sample = new ScheduleBlock(sample_activity, sample_start_time, sample_end_time)
describe('class ScheduleBlock', function () {
  describe('constructor()', function () {
    it('constructor should return an object', function () {
      assert.notEqual(sample, undefined);
    });
    it('with attributes properly set', function () {
      assert.equal(sample.activity, sample_activity);
      assert.equal(sample.start_time, sample_start_time);
      assert.equal(sample.end_time, sample_end_time);
    });
  });
});
