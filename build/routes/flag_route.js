"use strict";

var _checkAuth = _interopRequireDefault(require("../usingDB/middleware/checkAuth"));

var _flagController = _interopRequireDefault(require("../usingDB/controller/flagController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var express = require("express");

var router = express.Router();
router.post('/api/v1/flag', _checkAuth["default"], _flagController["default"].create);
module.exports = router;
//# sourceMappingURL=flag_route.js.map