
const Counselor = require("../../entities/Counselor")
var assert = require('assert');

var sample_counselor_id = "c000000001";
var sample_lastname = "lastname";
var sample_firstname = "firstname";
var sample_campus_id = "c001";

var sample = new Counselor(sample_counselor_id, sample_lastname, sample_firstname, sample_campus_id)
describe('class Counselor', function () {
  describe('constructor()', function () {
    it('constructor should return an object', function () {
      assert.notEqual(sample, undefined);
    });
    it('with attributes properly set', function () {
      assert.equal(sample.counselor_id, sample_counselor_id);
      assert.equal(sample.lastname, sample_lastname);
      assert.equal(sample.firstname, sample_firstname);
      assert.equal(sample.campus_id, sample_campus_id);
    });
  });
});
