"use strict";

var _carController = _interopRequireDefault(require("../usingDB/controller/carController"));

var _checkAuth = _interopRequireDefault(require("../usingDB/middleware/checkAuth"));

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); //view all Ads available


router.get('/api/v1/car', function (req, res, next) {
  if (req.query.status === 'available') {
    res.send(_carController["default"].getAvailableCars());
  }

  next();
}); //admin view all car whether sold or available

router.get('/api/v1/car', _checkAuth["default"], _carController["default"].getAll); //post car Ad

router.post('/api/v1/car', _checkAuth["default"], _carController["default"].create); //View a specific car Ad

router.get('/api/v1/car/:carId/', _carController["default"].getOne); //View all unsold cars of a specific make
//router.get('/api/v1/car?status=available&state=new', Car.getNewAvailableCars);
//View all unsold cars of a specific make
//router.get('/api/v1/car?status=available&state=used', Car.getUsedAvailableCars);
//route to delete a specific car ad

router["delete"]('/api/v1/car/:carId', _checkAuth["default"], _carController["default"]["delete"]); //route to view range of car ad available based on price
//router.get('/api/v1/car?status=available&minPrice=XXXValue &maxPrice= XXXValue', Car.getFilterCars);
//route to view cars ad by bodyType
//router.get('api/v1/car?body_type=bodyType', Car.getCarByBodyType) 
//update status of a particular ad

router.patch('/api/v1/car/:carId/status', _checkAuth["default"], _carController["default"].getUpdateStatus); //router.get('api/v1/car?status=available&manufacturer=XXXValue', Car.getAvailableCarsByMake)
//update price of a particular Ad

router.patch('/api/v1/car/:carId/price', _checkAuth["default"], _carController["default"].getUpdatePrice);
module.exports = router;
//# sourceMappingURL=car_route.js.map