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

describe('USER', function () {
  // let userToken;
  var userOne = {
    email: 'testemail3@gmail.com',
    password: 'password'
  };
  var userTwo = {
    email: 'testemail4@gmail.com',
    password: 'password'
  };
  var userThree = {
    email: 'testemail5@gmail.com',
    password: 'password'
  };
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
            result.status.should.equal(201); // userToken = result.body.user.token;

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  describe('SIGNUP', function () {
    it('it should be an object with keys and values',
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
              return _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send(userTwo);

            case 2:
              result = _context2.sent;
              result.body.should.be.a('object');
              result.status.should.equal(201);
              result.body.user.should.have.property('email');
              result.body.user.should.have.property('password');
              result.body.user.email.should.equal('testemail4@gmail.com');
              result.body.user.should.have.property('id');

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    it('it should return a signin token',
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
              return _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send(userThree);

            case 2:
              result = _context3.sent;
              result.body.user.should.be.a('object');
              result.status.should.equal(201);
              result.body.user.should.have.property('token');

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    it('it should return a 400 error if required fields are missing for authorized login',
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
              return _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send({});

            case 2:
              result = _context4.sent;
              result.body.should.be.a('object');
              result.status.should.equal(400);
              result.body.should.eql({
                status: 400,
                error: 'please fill in required fields'
              });

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }))); // it('it should not allow repeated signup of the same user', async () => {
    //   const result = await chai
    //     .request(server)
    //     .post('/api/v1/auth/signup')
    //     .send({userOne})
    //   result.body.should.be.a('object');
    //   result.status.should.equal(404);
    //   result.body.should.eql({ status: 404, error:'A user with the specified email already exist'});
    // });
  }); // describe('SIGNIN', () => {
  //   it('it should return a 401 authentication failed for unauthorised user', async () => {
  //     const result = await chai
  //       .request(server)
  //       .patch(`/api/v1/order/${orderOneId}/price`)
  //       .send(orderOne)
  //     result.status.should.equal(401);
  //     result.body.should.eql({ status: 401, error: 'Authentication failed' });
  //   });
  //   it('it should be successful with 200 response upon authorization', async () => {
  //     const result = await chai
  //       .request(server)
  //       .patch(`/api/v1/order/${orderTwoId}/price`)
  //       .set('Authorization', userToken)
  //       .send(orderOne)
  //     result.status.should.equal(200);
  //   })
  //   it('it should be an object with keys and values', async () => {
  //     const result = await chai
  //       .request(server)
  //       .patch(`/api/v1/order/${orderTwoId}/price`)
  //       .send(orderOne)
  //     result.body.should.be.a('object');
  //     result.status.should.equal(200);
  //     result.body.modifiedOrder.should.have.property('price_offered');
  //     result.body.modifiedOrder.should.have.property('price');
  //     result.body.modifiedOrder.price.should.equal('200000');
  //     result.body.modifiedOrder.should.have.property('car_id');
  //     result.body.modifiedOrder.should.have.property('buyer');
  //     result.body.modifiedOrder.should.have.property('status');
  //     result.body.modifiedOrder.should.have.property('old_price_offered');
  //     result.body.modifiedOrder.should.have.property('new_price_offered');
  //     result.body.modifiedOrder.should.have.property('id');
  //   })
  //   it('it should return a 400 error if required fields are missing', async () => {
  //     const result = await chai
  //       .request(server)
  //       .patch(`/api/v1/order/${orderTwoId}/price`)
  //       .set('Authorization', userToken)
  //       .send({})
  //     result.body.should.be.a('object');
  //     result.status.should.equal(400);
  //     result.body.should.eql({ status: 400, error: 'please enter new price offered and car ID'});
  //   });
  //   it('it should return a 404 error if status is not pending', async () => {
  //     const result = await chai
  //       .request(server)
  //       .patch(`/api/v1/order/${orderOneId}/price`)
  //       .set('Authorization', userToken)
  //       .send({ new_price_offered: 800000, })
  //     result.body.should.be.a('object');
  //     result.status.should.equal(404);
  //     result.body.should.eql({ status: 404, error: `cannot update price, status is available` });
  //   });
  //   it('it should update an order if status is pending', async () => {
  //     const result = await chai
  //       .request(server)
  //       .patch(`/api/v1/order/${orderTwoId}/price`)
  //       .set('Authorization', userToken)
  //       .send({
  //         new_price_offered: '800000',
  //       })
  //     result.status.should.equal(200);
  //     result.body.modifiedOrder.should.have.property('new_price_offered');
  //     result.body.modifiedOrder.new_price_offered.should.equal('800000');
  //   });
  // });
});
//# sourceMappingURL=user.js.map