"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _uuid = _interopRequireDefault(require("uuid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Car =
/*#__PURE__*/
function () {
  /**
   * class constructor
   * @param {object} data
   */
  function Car() {
    _classCallCheck(this, Car);

    this.cars = [];
  }
  /**
   *
   * @returns {object} car object
   */
  //create a car ad


  _createClass(Car, [{
    key: "create",
    value: function create(data) {
      var newCar = {
        status: 200,
        data: {
          id: _uuid["default"].v4(),
          created_on: _moment["default"].now(),
          manufacturer: data.manufacturer,
          model: data.model,
          price: data.price,
          state: data.state || 'string',
          status: data.status,
          createdDate: _moment["default"].now(),
          modifiedDate: _moment["default"].now()
        }
      }; //push car to cars array

      this.cars.push(newCar);
      return newCar;
    }
    /**
    *
    * @param {uuid} id
    * @returns {object} car object
    */
    //search for a single car

  }, {
    key: "findOne",
    value: function findOne(id) {
      for (var i = 0; i < this.cars.length; i++) {
        if (this.cars[i].data.id === id) {
          return this.cars[i];
        }
      }

      return null;
    } //find cars available based on status

  }, {
    key: "findAvailableCars",
    value: function findAvailableCars(status) {
      var availableCars = [];

      for (var i = 0; i < this.cars.length; i++) {
        if (this.cars[i].data.status === status) {
          availableCars.push(this.cars[i]);
        }
      }

      return availableCars;
    } //Update status of car ad as "sold"

  }, {
    key: "updateStatus",
    value: function updateStatus(id) {
      var specificCar = this.findOne(id);
      specificCar.data.status = 'sold';
      return specificCar;
    } //filter cars based on status, minimum price and maximum price provided

  }, {
    key: "findFilterCars",
    value: function findFilterCars(status, minPrice, maxPrice) {
      var unsoldCars = findAvailableCars(status);
      var carRange = [];

      for (var i = 0; i < unsoldCars.length; i++) {
        if (unsoldCars[i].data.price <= maxPrice && unsoldCars[i].data.price >= minPrice) {
          carRange.push(unsoldCars[i]);
        }
      }

      return carRange;
    }
    /**
    *
    * @param {uuid} id
    * @returns {object} car object
    */
    //delete car ad

  }, {
    key: "deleteCar",
    value: function deleteCar(id) {
      for (var i = 0; i < this.cars.length; i++) {
        if (this.cars[i].data.id === id) {
          this.cars.splice(i, 1);
          return {
            message: 'Car Ad successfull deleted'
          };
        }
      }

      return null;
    } //update price of car 

  }, {
    key: "updateCarPrice",
    value: function updateCarPrice(id, newPrice) {
      for (var i = 0; i < this.cars.length; i++) {
        if (this.cars[i].data.id === id) {
          this.cars[i].data.price = newPrice;
          return this.cars[i];
        }
      }

      return null;
    }
    /**
     * @returns {object} returns all cars
     */
    //return all cars available

  }, {
    key: "findAll",
    value: function findAll() {
      return this.cars;
    }
  }]);

  return Car;
}();

var _default = new Car();

exports["default"] = _default;
//# sourceMappingURL=car_model.js.map