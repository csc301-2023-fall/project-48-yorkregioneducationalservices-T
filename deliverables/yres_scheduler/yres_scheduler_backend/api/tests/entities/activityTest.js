const Activity = require("../../entities/Activity")
var assert = require('assert');

var sample_activity_id = "a000000001";
var sample_name = "Math Class";
var sample_duration = 1;
var sample_type = "filler";
var sample_num_occurences = 5;
var sample_room_ids = new Array();
var sample = new Activity(sample_activity_id, sample_name, sample_duration, sample_type, sample_num_occurences, sample_room_ids);
describe('class Activity', function () {
  describe('constructor()', function () {
    it('constructor should return an object', function () {
      assert.notEqual(sample, undefined);
    });
    it('with attributes properly set', function () {
      assert.equal(sample.activity_id, sample_activity_id);
      assert.equal(sample.name, sample_name);
      assert.equal(sample.duration, sample_duration);
      assert.equal(sample.type, sample_type);
      assert.equal(sample.num_occurences, sample_num_occurences);
      assert.equal(sample.room_ids.length, 0);
    });
  });
});
