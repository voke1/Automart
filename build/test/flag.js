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

describe('FLAG', function () {
  var userOne = {
    email: 'testemail@gmail.com',
    password: 'password'
  };
  var flagOne = {
    id: 1,
    car_id: 3,
    reason: 'first reason',
    description: 'first description',
    status: 'available',
    created_date: 12345,
    modified_date: 12345
  };
  var flagTwo = {
    id: 2,
    car_id: 4,
    reason: 'second reason',
    description: 'second description',
    status: 'pending',
    created_date: 12345,
    modified_date: 12345
  };
  var userToken;
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
  describe('/POST api/v1/flag', function () {
    it('it should return a 401 authentication failed',
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
              return _chai["default"].request(_app["default"]).post('/api/v1/flag').send(flagOne);

            case 2:
              result = _context2.sent;
              result.status.should.equal(401);
              result.body.should.eql({
                status: 401,
                error: 'Authentication failed'
              });

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    it('it should return a 201 response upon authorization',
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
              return _chai["default"].request(_app["default"]).post('/api/v1/flag').set('Authorization', userToken).send(flagOne);

            case 2:
              result = _context3.sent;
              result.status.should.equal(201);

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    it('it should be an object with keys and values for authorised login',
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
              return _chai["default"].request(_app["default"]).post('/api/v1/flag').set('Authorization', userToken).send(flagTwo);

            case 2:
              result = _context4.sent;
              result.body.should.be.a('object');
              result.status.should.equal(201);
              result.body.flag.should.have.property('reason');
              result.body.flag.should.have.property('car_id');
              result.body.flag.reason.should.equal('second reason');
              result.body.flag.should.have.property('description');

            case 9:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
    it('it should return a 400 error if required fields are missing for authorized login',
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
              return _chai["default"].request(_app["default"]).post('/api/v1/flag').set('Authorization', userToken).send({});

            case 2:
              result = _context5.sent;
              result.body.should.be.a('object');
              result.status.should.equal(400);
              result.body.should.eql({
                status: 400,
                error: 'please enter car Id and reason for report'
              });

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
  });
});
//# sourceMappingURL=flag.js.map