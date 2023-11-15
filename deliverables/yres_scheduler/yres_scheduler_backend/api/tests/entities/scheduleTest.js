// const Activity = require("../../entities/Activity")
// const Schedule = require("../../entities/Schedule")
// const ScheduleBlock = require("../../entities/ScheduleBlock")
// var assert = require('assert');

// var sample_schedule_id = "s000000001";
// var sample_camp_id = "c000000001";
// var sample_start_time = new Date(2023, 10, 20, 9, 0, 0);
// var sample_name = "Camp A Schedule";
// var sample_activity = new Activity("c01", "a01", "Math Class", 1);
// var sample = new Schedule(sample_schedule_id, sample_camp_id, sample_start_time, sample_name)

// describe('class Schedule', function () {
//   describe('constructor()', function () {
//     it('constructor should return an object', function () {
//       assert.notEqual(sample, undefined);
//     });
//     it('with attributes properly set', function () {
//       assert.equal(sample.schedule_id, sample_schedule_id);
//       assert.equal(sample.camp_id, sample_camp_id);
//       assert.equal(sample.start_time, sample_start_time);
//       assert.equal(sample.name, sample_name);
//     });
//     it('with list defined but empty', function () {
//       assert.notEqual(sample.schedule_blocks, undefined);
//       assert.equal(sample.schedule_blocks.length, 0);
//     })
//     it('addScheduleBlock() should add an item to the list', function() {
//       sample.addScheduleBlock(sample_activity);
//       assert.equal(sample.getScheduleBlocks().length, 1);
//     });
//     it('addScheduleBlock() should set the first ScheduleBlock start/end time appropriately', function() {
//       assert.equal(sample.getScheduleBlocks()[0].start_time.getTime(), sample_start_time.getTime());
//       assert.equal(sample.getScheduleBlocks()[0].end_time.getTime(), (sample_start_time.getTime() + 60 * 60 * 1000));
//     });
//     it('addScheduleBlock() should add the second item to the list', function() {
//       sample.addScheduleBlock(sample_activity);
//       assert.equal(sample.getScheduleBlocks().length, 2);
//     });
//     it('addScheduleBlock() should set the second ScheduleBlock start/end time appropriately', function() {
//       assert.equal(sample.getScheduleBlocks()[1].start_time.getTime(), (sample_start_time.getTime() + 60 * 60 * 1000));
//       assert.equal(sample.getScheduleBlocks()[1].end_time.getTime(), (sample_start_time.getTime() + 2 * 60 * 60 * 1000));
//     });
//   });
// });
