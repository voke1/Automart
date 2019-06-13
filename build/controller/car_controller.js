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
        status: 400,
        error: 'All fields are required'
      });
    }

    var data = _car_model["default"].create(req.body);

    data.email = req.body.email;
    return res.status(201).send({
      status: 201,
      data: data
    });
  },
  //view a specific car
  getOne: function getOne(req, res) {
    var car = _car_model["default"].findOne(req.params.carId);

    if (!car) {
      return res.status(404).send({
        status: 404,
        error: 'car not found'
      });
    }

    car.body_type = req.body.body_type || ' ';
    car.status = 200;
    return res.status(200).send({
      status: 200,
      car: car
    });
  },
  //view all available cars posted
  getAvailableCars: function getAvailableCars(req, res) {
    var carsArray = _car_model["default"].findAvailableCars(req.query.status);

    return res.status(200).send({
      status: 200,
      carsArray: carsArray
    });
  },
  //update price of car ad posted
  getUpdatePrice: function getUpdatePrice(req, res) {
    var car = _car_model["default"].findOne(req.params.carId);

    if (!car) {
      return res.status(404).send({
        status: 404,
        error: 'car not found'
      });
    }

    try {
      var data = _car_model["default"].updateCarPrice(req.params.carId, req.body.price);

      return res.status(200).send({
        status: 200,
        data: data
      });
    } catch (error) {
      return res.status(404).send({
        status: 404,
        error: 'cannot update price'
      });
    }
  },
  //delete a specific car in array
  "delete": function _delete(req, res) {
    var car = _car_model["default"].findOne(req.params.carId);

    if (!car) {
      return res.status(404).send({
        status: 404,
        error: 'no car to delete'
      });
    }

    var data = _car_model["default"].deleteCar(req.params.carId);

    return res.status(200).send({
      status: 404,
      data: data
    });
  },
  //update status of car in array
  getUpdateStatus: function getUpdateStatus(req, res) {
    var car = _car_model["default"].findOne(req.params.carId);

    if (!car) {
      return res.status(404).send({
        status: 404,
        error: 'car not found'
      });
    }

    try {
      var specifiedCar = _car_model["default"].updateStatus(req.params.carId);

      return res.status(200).send(specifiedCar);
    } catch (error) {
      return res.status(404).send({
        status: 404,
        error: 'cannot update status'
      });
    }
  },
  //search for cars based on price and status
  getFilterCars: function getFilterCars(req, res) {
    try {
      var data = _car_model["default"].findFilterCars(req.query.status, req.query.minPrice, req.query.maxPrice);

      return res.status(200).send({
        status: 200,
        data: data
      });
    } catch (error) {
      res.status(404).send({
        status: 404,
        error: 'cannot find cars'
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
    var data = _car_model["default"].findAll();

    return res.status(200).send({
      status: 200,
      data: data
    });
  }
};
var _default = Car;
exports["default"] = _default;
//# sourceMappingURL=car_controller.js.map