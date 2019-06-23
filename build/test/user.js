"use strict";

var _user_model = _interopRequireDefault(require("../model/user_model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var assert = require('chai').assert;

describe('create', function () {
  it('create(data) should return {} if no items are passed in', function () {
    assert.isObject(_user_model["default"]["default"]);
  });
});
//# sourceMappingURL=user.js.map