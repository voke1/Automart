"use strict";

var _car_controller = _interopRequireDefault(require("../controller/car_controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var express = require('express');

var router = express.Router(); //admin view all car whether sold or available

router.get('/api/v1/car', _car_controller["default"].getAll); //post car Ad

router.post('/api/v1/car', _car_controller["default"].create); //View a specific car Ad

router.get('/api/v1/car/:carId/', _car_controller["default"].getOne); //view all Ads available

router.get('/api/v1/car?status=available', _car_controller["default"].getAvailableCars); //route to delete a specific car ad

router["delete"]('/api/v1/car/:carId', _car_controller["default"]["delete"]); //route to view range of car ad available based on price

router.get('/api/v1/car?status=available&minPrice=XXXValue &maxPrice= XXXValue', _car_controller["default"].getFilterCars); //update status of a particular ad

router.patch('/api/v1/car/:carId/status', _car_controller["default"].getUpdateStatus); //update price of a particular Ad

router.patch('/api/v1/car/:carId/price', _car_controller["default"].getUpdatePrice);
module.exports = router;
//# sourceMappingURL=car_route.js.map