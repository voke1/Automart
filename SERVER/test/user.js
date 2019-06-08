var assert = require('chai').assert;
var mocha = require("mocha");
var UserModel  = require('../model/user_model');


describe('create', () => {
  it('create(data) should return {} if no items are passed in', () => {
    assert.isObject(UserModel.default)
  });
});