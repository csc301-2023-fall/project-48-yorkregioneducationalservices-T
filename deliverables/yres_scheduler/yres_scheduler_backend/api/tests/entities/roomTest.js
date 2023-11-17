const Room = require("../../entities/Room")
var assert = require('assert');

var sample_name = "room name";
var sample_campus_id = "918f7a08-84fb-11ee-b9d1-0242ac120002";
var sample_room_id = "094f7658-84fa-11ee-b9d1-0242ac120002";
var sample = new Room(sample_room_id, sample_name, sample_campus_id)
describe('class Room', function () {
  describe('constructor()', function () {
    it('constructor should return an object', function () {
      assert.notEqual(sample, undefined);
    });
    it('with attributes properly set', function () {
      assert.equal(sample.name, sample_name);
      assert.equal(sample.room_id, sample_room_id);
      assert.equal(sample.campus_id, sample_campus_id);
    });
  });
});
