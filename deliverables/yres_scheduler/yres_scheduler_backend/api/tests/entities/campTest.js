const Camp = require("../../entities/Camp")
var assert = require('assert');

var sample_camp_id = "6cc76258-ef76-4cf0-91fa-046fa177626e";
var sample_name = "Test Camp";
var sample_activity_ids = new Set(["id1", "id2", "id3"]);
var sample_campus_id = "85d5faea-6088-4901-a662-f9a14b231ba7"
var sample = new Camp(
    sample_camp_id,
    sample_name,
    sample_activity_ids,
    sample_campus_id);

describe('class Camp', function () {
  describe('constructor()', function () {
    it('constructor should return an object', function () {
      assert.notEqual(sample, undefined);
    });
    it('with attributes properly set', function () {
      assert.equal(sample.camp_id, sample_camp_id);
      assert.equal(sample.name, sample_name);
      assert.equal(sample.activity_ids, sample_activity_ids);
      assert.equal(sample.campus_id, sample_campus_id);
    });
    it('Camp.addActivity() works correctly', function() {
      sample.addActivity();
      sample_activity_ids.add( "658ab6df-ba1f-4fad-8fbd-016412dce1f4");
      assert.equal(sample.activity_ids, sample_activity_ids);
    });
    it('Camp.numActivities() works correctly', function() {
      assert.equal(sample.numActivities(), sample_activity_ids.size);
    });
  });
});
