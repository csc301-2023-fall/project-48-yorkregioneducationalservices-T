const User = require("../../entities/User")
var assert = require('assert');

var sample_username = "username";
var sample_password = "pass123456";
var sample = new User(sample_username, sample_password);
describe('class User', function () {
  describe('constructor()', function () {
    it('constructor should return an object', function () {
      assert.notEqual(sample, undefined);
    });
    it('with attributes properly set', function () {
      assert.equal(sample.username, sample_username);
      assert.equal(sample.password, sample_password);
    });

  });
});
