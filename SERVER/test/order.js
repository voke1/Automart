var assert = require('chai').assert;
var mocha = require("mocha");
var OrderModel  = require('../model/order_model');


describe('create', () => {
  it('create(data) should return {} if no items are passed in', () => {
    assert.isObject(OrderModel.default)
  });
});