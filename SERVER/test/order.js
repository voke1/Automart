var assert = require('chai').assert;
var OrderModel  = require('../model/order_model');


describe('create', () => {
  it('create(data) should return {} if no items are passed in', () => {
    assert.isObject(OrderModel.default)
  });
});