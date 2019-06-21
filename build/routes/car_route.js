"use strict";

var _carController = _interopRequireDefault(require("../usingDB/controller/carController"));

var _checkAuth = _interopRequireDefault(require("../usingDB/middleware/checkAuth"));

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); //view Car Ads based on input query


router.get('/api/v1/car', _checkAuth["default"], _carController["default"].getAll); //post car Ad

router.post('/api/v1/car', _checkAuth["default"], _carController["default"].create); //View a specific car Ad

router.get('/api/v1/car/:carId/', _carController["default"].getOne); //route to delete a specific car ad

router["delete"]('/api/v1/car/:carId', _checkAuth["default"], _carController["default"]["delete"]); //update status of a particular ad

router.patch('/api/v1/car/:carId/status', _checkAuth["default"], _carController["default"].getUpdateStatus); //update price of a particular Ad

router.patch('/api/v1/car/:carId/price', _checkAuth["default"], _carController["default"].getUpdatePrice);
module.exports = router;
//# sourceMappingURL=car_route.js.map