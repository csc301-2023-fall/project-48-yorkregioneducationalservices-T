const Activity = require("../../entities/Activity")
var assert = require('assert');

var sample_camp_id = "c000000001";
var sample_activity_id = "a000000001";
var sample_name = "Math Class";
var sampe_time_length = 1;
var sample = new Activity(sample_camp_id, sample_activity_id, sample_name, sampe_time_length)
describe('class Activity', function () {
  describe('constructor()', function () {
    it('constructor should return an object', function () {
      assert.notEqual(sample, undefined);
    });
    it('with attributes properly set', function () {
      assert.equal(sample.camp_id, sample_camp_id);
      assert.equal(sample.activity_id, sample_activity_id);
      assert.equal(sample.name, sample_name);
      assert.equal(sample.time_length, sampe_time_length);
    });

  });
});
