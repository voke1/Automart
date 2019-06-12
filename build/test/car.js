"use strict";

var _car_model = _interopRequireDefault(require("../model/car_model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var assert = require('chai').assert;

describe('create', function () {
  it('create(data) should return {} if no items are passed in', function () {
    assert.isObject(_car_model["default"]["default"]);
  });
});
//# sourceMappingURL=car.js.map