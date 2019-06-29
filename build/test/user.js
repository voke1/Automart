"use strict";

var _chai = require("chai");

var _userController = _interopRequireDefault(require("../usingDB/controller/userController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// eslint-disable-next-line import/no-extraneous-dependencies
describe('create', function () {
  it('create(data) should return {} if no items are passed in', function () {
    var result = _userController["default"].create;

    _chai.assert.isOk(result);
  });
});
//# sourceMappingURL=user.js.map