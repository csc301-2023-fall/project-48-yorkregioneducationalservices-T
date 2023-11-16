const Activity = require("../../entities/Activity")
var assert = require('assert');

var sample_type = Activity.COMMON_TYPE;
var sample_activity_id = "d700a576-60fd-4ab4-96b6-dd1e2fea855a";
var sample_name = "Math Class";
var sample_num_occurences = 3;
var sampe_time_length = 1;
var sample = new Activity(sample_activity_id, sample_name, sampe_time_length, sample_type, sample_num_occurences);
describe('class Activity', function () {
  describe('constructor()', function () {
    it('constructor should return an object', function () {
      assert.notEqual(sample, undefined);
    });
    it('with attributes properly set', function () {
      assert.equal(sample.num_occurences, sample_num_occurences);
      assert.equal(sample.activity_id, sample_activity_id);
      assert.equal(sample.name, sample_name);
      assert.equal(sample.duration, sampe_time_length);
      assert.equal(sample.type, sample_type);
    });

  });
});
