"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_chai["default"].use(_chaiHttp["default"]);

should = _chai["default"].should(); // During the test the env variable is set to test

process.env.NODE_ENV = 'test'; // Our parent block

describe('CAR', function () {
  var userOne = {
    email: 'testemail@gmail.com',
    password: 'password'
  };
  var firstCar = {
    id: 1,
    car_id: 3,
    price: 200000,
    buyer: 'John Doe',
    status: 'available',
    manufacturer: 'Toyota',
    state: 'new',
    created_date: 12345,
    modified_date: 12345
  };
  var secondCar = {
    id: 2,
    car_id: 4,
    price: 200000,
    buyer: 'John Williams',
    status: 'pending',
    manufacturer: 'Toyota',
    state: 'used',
    created_date: 12345,
    modified_date: 12345
  };
  var userToken;
  var firstCarId;
  var secondCarId;
  before(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send(userOne);

          case 2:
            result = _context.sent;
            result.status.should.equal(201);
            userToken = result.body.user.token;

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  before(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _chai["default"].request(_app["default"]).post('/api/v1/car').set('Authorization', userToken).send(firstCar);

          case 2:
            result = _context2.sent;
            result.status.should.equal(201);
            firstCarId = result.body.data.id;

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  before(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3() {
    var result;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _chai["default"].request(_app["default"]).post('/api/v1/car').set('Authorization', userToken).send(secondCar);

          case 2:
            result = _context3.sent;
            result.status.should.equal(201);
            secondCarId = result.body.data.id;

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
  describe('/POST api/v1/car:   post a Car Ad', function () {
    it('it should return a 401 authentication failed',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var result;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _chai["default"].request(_app["default"]).post('/api/v1/car').send(firstCar);

            case 2:
              result = _context4.sent;
              result.status.should.equal(401);
              result.body.should.eql({
                status: 401,
                error: 'Authentication failed'
              });

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
    it('it should return a 201 response upon authorization',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5() {
      var result;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _chai["default"].request(_app["default"]).post('/api/v1/car').set('Authorization', userToken).send(firstCar);

            case 2:
              result = _context5.sent;
              result.status.should.equal(201);

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
    it('it should be an object with keys and values for authorised login',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6() {
      var result;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return _chai["default"].request(_app["default"]).post('/api/v1/car').set('Authorization', userToken).send(secondCar);

            case 2:
              result = _context6.sent;
              result.body.should.be.a('object');
              result.status.should.equal(201);
              result.body.data.should.have.property('price');
              result.body.data.price.should.equal('200000');
              result.body.data.should.have.property('manufacturer');
              result.body.data.should.have.property('state');
              result.body.data.should.have.property('status');

            case 10:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    })));
    it('it should return a 400 error if required fields are missing for authorized login',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7() {
      var result;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return _chai["default"].request(_app["default"]).post('/api/v1/car').set('Authorization', userToken).send({});

            case 2:
              result = _context7.sent;
              result.body.should.be.a('object');
              result.status.should.equal(400);
              result.body.should.eql({
                status: 400,
                error: 'please enter required fields'
              });

            case 6:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    })));
  });
  describe('/api/v1/car/:carId/price: update price of purchase car', function () {
    it('it should return a 401 authentication failed for unauthorised user',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8() {
      var result;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return _chai["default"].request(_app["default"]).patch("/api/v1/car/".concat(firstCarId, "/price")).send(firstCar);

            case 2:
              result = _context8.sent;
              result.status.should.equal(401);
              result.body.should.eql({
                status: 401,
                error: 'Authentication failed'
              });

            case 5:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    })));
    it('it should be successful with 200 response upon authorization',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee9() {
      var result;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return _chai["default"].request(_app["default"]).patch("/api/v1/car/".concat(secondCarId, "/price")).set('Authorization', userToken).send(firstCar);

            case 2:
              result = _context9.sent;
              result.status.should.equal(200);

            case 4:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    })));
    it('it should be an object with keys and values',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee10() {
      var result;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return _chai["default"].request(_app["default"]).patch("/api/v1/car/".concat(secondCarId, "/price")).set('Authorization', userToken).send(firstCar);

            case 2:
              result = _context10.sent;
              result.body.should.be.a('object');
              result.status.should.equal(200);
              result.body.updatedAd.should.have.property('price');
              result.body.updatedAd.price.should.equal('200000');
              result.body.updatedAd.should.have.property('manufacturer');
              result.body.updatedAd.should.have.property('state');
              result.body.updatedAd.should.have.property('status');

            case 10:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    })));
    it('it should return a 400 error if required fields are missing',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee11() {
      var result;
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return _chai["default"].request(_app["default"]).patch("/api/v1/car/".concat(secondCarId, "/price")).set('Authorization', userToken).send({});

            case 2:
              result = _context11.sent;
              result.body.should.be.a('object');
              result.status.should.equal(400);
              result.body.should.eql({
                status: 400,
                error: 'please enter required fields'
              });

            case 6:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    })));
    it('it should update car Ad price',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee12() {
      var result;
      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return _chai["default"].request(_app["default"]).patch("/api/v1/car/".concat(secondCarId, "/price")).set('Authorization', userToken).send({
                price: '800000'
              });

            case 2:
              result = _context12.sent;
              result.status.should.equal(200);
              result.body.updatedAd.should.have.property('price');
              result.body.updatedAd.price.should.equal('800000');

            case 6:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    })));
  });
});
//# sourceMappingURL=car.js.map