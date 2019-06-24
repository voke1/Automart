"use strict";

var _chai = require("chai");

var _flagController = _interopRequireDefault(require("../usingDB/controller/flagController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// eslint-disable-next-line import/no-extraneous-dependencies
describe('create', function () {
  it('create(data) should return {} if no items are passed in', function () {
    var result = _flagController["default"].create;

    _chai.assert.isOk(result);
  });
});
//# sourceMappingURL=flag.js.map