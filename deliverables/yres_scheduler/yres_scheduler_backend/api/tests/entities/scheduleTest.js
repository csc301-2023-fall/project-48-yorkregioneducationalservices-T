const Activity = require("../../entities/Activity");
const Schedule = require("../../entities/Schedule");
const Block = require("../../entities/Block");
var assert = require('assert');

var sample_schedule_id = "a2b1c0e1-887c-48a7-9552-72acbbea9775";
var sample_group_id = "9992a0bf-0715-43ab-aa43-56b37295bcc1";
var sample_start_time = new Date(2023, 10, 20, 9, 0, 0);
var sample_end_time = new Date(2023, 10, 20, 15, 0, 0);
var sample_blocks = [];
var sample_activity_a = new Activity("1adf63d9-53f3-4986-9d22-cc758854c3f6", "Test Activity A", 1, Activity.COMMON_TYPE, 3, "74942b66-53fb-4c6f-ab75-4b74bef1ed7f");
var sample_activity_b = new Activity("1adf63d9-53f3-4986-9d22-cc758854c3f6", "Test Activity A", 1, Activity.COMMON_TYPE, 3, "74942b66-53fb-4c6f-ab75-4b74bef1ed7f");
var sample = new Schedule(sample_schedule_id, sample_group_id, sample_blocks, sample_start_time, sample_end_time);

describe('class Schedule', function () {
  describe('constructor()', function () {
    it('constructor should return an object', function () {
      assert.notEqual(sample, undefined);
    });
    it('with attributes properly set', function () {
      assert.equal(sample.schedule_id, sample_schedule_id);
      assert.equal(sample.group_id, sample_group_id);
      assert.equal(sample.start_time, sample_start_time);
      assert.equal(sample.end_time, sample_end_time);
    });
    it('with list defined but empty', function () {
      assert.notEqual(sample.blocks, undefined);
      assert.equal(sample.blocks.length, 0);
    })
    it('addBlock() should add an item to the list', function() {
      sample.addBlock(sample_activity_a);
      assert.equal(sample.blocks.length, 1);
    });
  });
});
