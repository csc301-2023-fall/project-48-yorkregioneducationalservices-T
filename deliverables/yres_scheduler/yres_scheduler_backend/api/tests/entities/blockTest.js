const Block = require("../../entities/Block")
var assert = require('assert');

var sample_block_id = "ae69df15-4a98-4fc9-b314-92a382c29b0d";
var sample_schedule_id = "263adcd6-9f4f-4ef4-a138-f6c37bd63053";
var sample_room_id = "055d2c16-84fa-11ee-b9d1-0242ac120002";
var sample_activity_id = "094f7658-84fa-11ee-b9d1-0242ac120002"
var sample_day = 1;
var sample_time = 1;
var sample = new Block(
  sample_block_id,
  sample_schedule_id,
  sample_room_id,
  sample_activity_id,
  sample_day,
  sample_time);

describe('class Block', function () {
  describe('constructor()', function () {
    it('constructor should return an object', function () {
      assert.notEqual(sample, undefined);
    });
    it('with attributes properly set', function () {
      assert.equal(sample.block_id, sample_block_id);
      assert.equal(sample.schedule_id, sample_schedule_id);
      assert.equal(sample.room_id, sample_room_id);
      assert.equal(sample.activity_id, sample_activity_id);
      assert.equal(sample.day, sample_day);
      assert.equal(sample.time, sample_time);
    });
  });
});