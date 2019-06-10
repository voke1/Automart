"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _car_model = _interopRequireDefault(require("../model/car_model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Car = {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} car object
   */
  //post car to car array (as database)
  create: function create(req, res) {
    if (!req.body.manufacturer && !req.body.price && !req.body.model) {
      return res.status(400).send({
        message: 'All fields are required'
      });
    }

    var car = _car_model["default"].create(req.body);

    car.data.email = req.body.email;
    return res.status(201).send(car);
  },
  //view a specific car
  getOne: function getOne(req, res) {
    var car = _car_model["default"].findOne(req.params.carId);

    if (!car) {
      return res.status(404).send({
        message: 'car not found'
      });
    }

    car.data.body_type = req.body.body_type || ' ';
    return res.status(200).send(car);
  },
  //view all available cars posted
  getAvailableCars: function getAvailableCars(req, res) {
    var carsArray = _car_model["default"].findAvailableCars(req.query.status);

    return res.status(200).send(carsArray);
  },
  //update price of car ad posted
  getUpdatePrice: function getUpdatePrice(req, res) {
    var car = _car_model["default"].findOne(req.params.carId);

    if (!car) {
      return res.status(404).send({
        message: 'car not found'
      });
    }

    try {
      var _car = _car_model["default"].updateCarPrice(req.params.carId, req.body.price);

      return res.status(200).send(_car);
    } catch (error) {
      return res.status(404).send({
        message: 'cannot update price'
      });
    }
  },
  //delete a specific car in array
  "delete": function _delete(req, res) {
    var car = _car_model["default"].findOne(req.params.carId);

    if (!car) {
      return res.status(404).send({
        message: 'no car to delete'
      });
    }

    var deleted = _car_model["default"].deleteCar(req.params.carId);

    return res.status(200).send(deleted);
  },
  //update status of car in array
  getUpdateStatus: function getUpdateStatus(req, res) {
    var car = _car_model["default"].findOne(req.params.carId);

    if (!car) {
      return res.status(404).send({
        message: 'car not found'
      });
    }

    try {
      var specifiedCar = _car_model["default"].updateStatus(req.params.carId);

      return res.status(200).send(specifiedCar);
    } catch (error) {
      return res.status(404).send({
        message: 'cannot update status'
      });
    }
  },
  //search for cars based on price and status
  getFilterCars: function getFilterCars(req, res) {
    try {
      var cars = _car_model["default"].findFilterCars(req.query.status, req.query.minPrice, req.query.maxPrice);

      return res.status(200).send(cars);
    } catch (error) {
      res.status(404).send({
        message: 'cannot find cars'
      });
    }
  },

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} car array
   */
  //find all cars
  getAll: function getAll(req, res) {
    var cars = _car_model["default"].findAll();

    return res.status(200).send(cars);
  }
};
var _default = Car;
exports["default"] = _default;
//# sourceMappingURL=car_controller.js.map