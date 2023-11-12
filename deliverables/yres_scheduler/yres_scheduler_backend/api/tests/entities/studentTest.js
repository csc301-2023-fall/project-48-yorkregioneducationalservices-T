const Student = require("../../entities/Student")
var assert = require('assert');

var sample_sid = "s000000001";
var sample_lastname = "lastname";
var sample_firstname = "firstname";
var sample_age = 9;
var sample_gender = "M";
var sample_campusID = "c001";

var sample = new Student(sample_sid, sample_lastname, sample_firstname, sample_age, sample_gender, sample_campusID)
describe('class Student', function () {
  describe('constructor()', function () {
    it('constructor should return an object', function () {
      assert.notEqual(sample, undefined);
    });
    // it('with attributes properly set', function () {
    //   assert.equal(sample.sID, sample_sid);
    //   assert.equal(sample.lastname, sample_lastname);
    //   assert.equal(sample.firstname, sample_firstname);
    //   assert.equal(sample.age, sample_age);
    //   assert.equal(sample.gender, sample_gender);
    //   assert.equal(sample.campusID, sample_campusID);
    // });
  });
});
