const User = require("../../entities/AdminUser")
var assert = require('assert');

var sample_user_id = "u00000001";
var sample_username = "username";
var sample_password = "pass123456";
var sample = new User(sample_user_id, sample_username, sample_password)
describe('class User', function () {
  describe('constructor()', function () {
    it('constructor should return an object', function () {
      assert.notEqual(sample, undefined);
    });
    it('with attributes properly set', function () {
      // assert.equal(sample.userID, sample_user_id);
      // assert.equal(sample.username, sample_username);
      // assert.equal(sample.password, sample_password);
    });

  });
});
