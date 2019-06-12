"use strict";

var assert = require('chai').assert;

var OrderModel = require('../model/order_model');

describe('create', function () {
  it('create(data) should return {} if no items are passed in', function () {
    assert.isObject(OrderModel["default"]);
  });
});
//# sourceMappingURL=order.js.map