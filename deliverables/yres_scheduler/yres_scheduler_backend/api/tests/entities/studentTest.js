const { set } = require("../../../app");
const Student = require("../../entities/Student")
var assert = require('assert');

var sample_student_id = "s000000001";
var sample_lastname = "lastname";
var sample_firstname = "firstname";
var sample_age = 9;
var sample_sex = "M";
var sample_friend_ids = new Set();
var sample_enemy_ids = new Set();

const sample = new Student(sample_student_id, sample_lastname, sample_firstname, sample_age, sample_sex, sample_friend_ids, sample_enemy_ids)
describe('class Student', function () {
  describe('constructor()', function () {
    it('constructor should return an object', function () {
      assert.notEqual(sample, undefined);
    });
    it('with attributes properly set', function () {
      assert.equal(sample.student_id, sample_student_id);
      assert.equal(sample.lastname, sample_lastname);
      assert.equal(sample.firstname, sample_firstname);
      assert.equal(sample.age, sample_age);
      assert.equal(sample.sex, sample_sex);
      assert.equal(sample.friend_ids, sample_friend_ids);
      assert.equal(sample.enemy_ids, sample_enemy_ids);
    });
  });
});
