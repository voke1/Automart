"use strict";

var _chai = require("chai");

var _carController = _interopRequireDefault(require("../usingDB/controller/carController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// eslint-disable-next-line import/no-extraneous-dependencies
describe('create', function () {
  it('create(data) should return {} if no items are passed in', function () {
    var result = _carController["default"].create;

    _chai.assert.isOk(result);
  });
});
//# sourceMappingURL=car.js.map