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
        id: _uuid["default"].v4(),
        created_on: _moment["default"].now(),
        manufacturer: data.manufacturer,
        model: data.model,
        price: data.price,
        state: data.state || 'string',
        status: data.status,
        body_type: data.body_type,
        createdDate: _moment["default"].now(),
        modifiedDate: _moment["default"].now()
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
        if (this.cars[i].id === id) {
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
        if (this.cars[i].status === status) {
          availableCars.push(this.cars[i]);
        }
      }

      return availableCars;
    } //view available cars by manufacturer

  }, {
    key: "findAvailableCarsByMake",
    value: function findAvailableCarsByMake(manufacturer, status) {
      var availableCars = this.findAvailableCars(status);
      var availableCarsByMake = [];

      for (var i = 0; i < this.cars.length; i++) {
        if (availableCars[i].manufacturer === manufacturer) {
          availableCarsByMake.push(this.cars[i]);
        }
      }

      return availableCarsByMake;
    } //find available cars by body type

  }, {
    key: "findCarByBodyType",
    value: function findCarByBodyType(status, bodyType) {
      var unsold = findAvailableCars(status);
      var carsByMake = [];

      for (var i = 0; i < unsoldCars.length; i++) {
        if (unsold[i].body_type = bodyType) {
          carsByMake.push(unsold[i]);
        }
      }

      return carsByMake;
    } //Update status of car ad as "sold"

  }, {
    key: "updateStatus",
    value: function updateStatus(id) {
      var specificCar = this.findOne(id);
      specificCar.status = 'sold';
      return specificCar;
    } //filter cars based on status, minimum price and maximum price provided

  }, {
    key: "findFilterCars",
    value: function findFilterCars(status, minPrice, maxPrice) {
      var unsoldCars = findAvailableCars(status);
      var carRange = [];

      for (var i = 0; i < unsoldCars.length; i++) {
        if (unsoldCars[i].price <= maxPrice && unsoldCars[i].price >= minPrice) {
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
        if (this.cars[i].id === id) {
          this.cars.splice(i, 1);
          return 'Car Ad successfull deleted';
        }
      }

      return null;
    } //update price of car 

  }, {
    key: "updateCarPrice",
    value: function updateCarPrice(id, newPrice) {
      for (var i = 0; i < this.cars.length; i++) {
        if (this.cars[i].id === id) {
          this.cars[i].price = newPrice;
          return this.cars[i];
        }
      }

      return null;
    } //find new Available car by make

  }, {
    key: "findNewAvailableCars",
    value: function findNewAvailableCars(status, state, manufacturer) {
      try {
        newAvailableCars = [];

        for (var i = 0; i < this.cars.length; i++) {
          if (this.cars[i].status === status && this.cars[i].state === state && this.cars[i].manufacturer === manufacturer) {
            newAvailableCars.push(this.cars[i]);
          }
        }
      } catch (error) {
        return {
          error: "no car found"
        };
      }
    } //find used available car by make

  }, {
    key: "findUsedAvailableCars",
    value: function findUsedAvailableCars(status, state, manufacturer) {
      try {
        newAvailableCars = [];

        for (var i = 0; i < this.cars.length; i++) {
          if (this.cars[i].status === status && this.cars[i].state === state && this.cars[i].manufacturer === manufacturer) {
            newAvailableCars.push(this.cars[i]);
          }
        }
      } catch (error) {
        return {
          error: "no car found"
        };
      }
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