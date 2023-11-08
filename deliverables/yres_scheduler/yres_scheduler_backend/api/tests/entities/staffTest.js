const Staff = require("../../entities/Staff")
var assert = require('assert');

var sample_stid = "st000000001";
var sample_lastname = "lastname";
var sample_firstname = "firstname";
var sample_campusID = "c001";

var sample = new Staff(sample_stid, sample_lastname, sample_firstname, sample_campusID)
describe('class Staff', function () {
  describe('constructor()', function () {
    it('constructor should return an object', function () {
      assert.notEqual(sample, undefined);
    });
    it('with attributes properly set', function () {
      assert.equal(sample.stID, sample_stid);
      assert.equal(sample.lastname, sample_lastname);
      assert.equal(sample.firstname, sample_firstname);
      assert.equal(sample.campusID, sample_campusID);
    });
  });
});
