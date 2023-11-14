const Room = require("../../entities/Room")
var assert = require('assert');

var sample_name = "room name";
var sample_type = 0;
var sample_roomID = "r0000001";
var sample = new Room(sample_name, sample_type, sample_roomID)
describe('class Room', function () {
  describe('constructor()', function () {
    it('constructor should return an object', function () {
      assert.notEqual(sample, undefined);
    });
    it('with attributes properly set', function () {
      // assert.equal(sample.name, sample_name);
      // assert.equal(sample.type, sample_type);
      // assert.equal(sample.roomID, sample_roomID);
    });
  });
});
