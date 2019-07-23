"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("@babel/polyfill");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _moment = _interopRequireDefault(require("moment"));

var _v = _interopRequireDefault(require("uuid/v4"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _async = _interopRequireDefault(require("async"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _crypto = _interopRequireDefault(require("crypto"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _db = _interopRequireDefault(require("../db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_dotenv["default"].config();

var User = {
  /**
   * Create A User
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  create: function () {
    var _create = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res) {
      var text, payload, options, secret, values, _ref, rows, data;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              text = "INSERT INTO\n      Users(id, token, email, first_name, last_name, password, is_admin, address, created_date, modified_date)\n      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)\n      returning *"; // handling no input value to sign up a user.

              if (!(!req.body.email || !req.body.password)) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                status: 400,
                error: 'please fill in required fields'
              }));

            case 3:
              // generate user token
              payload = {
                email: req.body.email,
                id: (0, _v["default"])(),
                isAdmin: req.body.is_admin
              };
              options = {
                expiresIn: '2d'
              };
              secret = process.env.TOKEN;
              req.body.token = _jsonwebtoken["default"].sign(payload, secret, options);
              values = [(0, _v["default"])(), req.body.token, req.body.email, req.body.first_name, req.body.last_name, // eslint-disable-next-line no-unused-vars
              _bcrypt["default"].hashSync(req.body.password, 10, function (error, hash) {
                if (error) {
                  return {
                    error: 'error found'
                  };
                }

                return null;
              }) || '', req.body.is_admin, req.body.address, (0, _moment["default"])(new Date()), (0, _moment["default"])(new Date())];
              _context.prev = 8;
              _context.next = 11;
              return _db["default"].query(text, values);

            case 11:
              _ref = _context.sent;
              rows = _ref.rows;
              data = rows[0];
              return _context.abrupt("return", res.status(201).send({
                status: 201,
                data: data
              }));

            case 17:
              _context.prev = 17;
              _context.t0 = _context["catch"](8);
              return _context.abrupt("return", res.status(400).send({
                status: 400,
                error: _context.t0
              }));

            case 20:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[8, 17]]);
    }));

    function create(_x, _x2) {
      return _create.apply(this, arguments);
    }

    return create;
  }(),

  /**
       * //sign in a user
       * @param {object} req
       * @param {object} res
       * @returns {object} return user Object
       */
  getOne: function () {
    var _getOne = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res) {
      var text, _ref2, rows;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              text = 'SELECT * FROM users WHERE email = $1';
              _context2.prev = 1;
              _context2.next = 4;
              return _db["default"].query(text, [req.body.email]);

            case 4:
              _ref2 = _context2.sent;
              rows = _ref2.rows;

              if (rows[0]) {
                _context2.next = 8;
                break;
              }

              return _context2.abrupt("return", res.status(404).send({
                status: 404,
                error: "A user with the specified email: ".concat(req.body.email, " was not found")
              }));

            case 8:
              // check if user password is correct
              _bcrypt["default"].compare(req.body.password, rows[0].password, function (error, result) {
                if (result) {
                  var data = rows[0];
                  return res.status(200).send({
                    status: 200,
                    data: data
                  });
                }

                return res.status(401).send({
                  status: 401,
                  error: 'Authentication information is invalid'
                });
              });

              _context2.next = 14;
              break;

            case 11:
              _context2.prev = 11;
              _context2.t0 = _context2["catch"](1);
              return _context2.abrupt("return", res.status(401).send({
                status: 401,
                error: 'Please enter valid email and password'
              }));

            case 14:
              return _context2.abrupt("return", null);

            case 15:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 11]]);
    }));

    function getOne(_x3, _x4) {
      return _getOne.apply(this, arguments);
    }

    return getOne;
  }(),
  // Get all users
  getAll: function () {
    var _getAll = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(req, res) {
      var findAllQuery, _ref3, rows;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              findAllQuery = 'SELECT * FROM users';
              _context3.prev = 1;
              _context3.next = 4;
              return _db["default"].query(findAllQuery);

            case 4:
              _ref3 = _context3.sent;
              rows = _ref3.rows;
              return _context3.abrupt("return", res.status(200).send({
                status: 200,
                rows: rows
              }));

            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3["catch"](1);
              return _context3.abrupt("return", res.status(401).send({
                status: 401,
                error: 'No user found'
              }));

            case 12:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[1, 9]]);
    }));

    function getAll(_x5, _x6) {
      return _getAll.apply(this, arguments);
    }

    return getAll;
  }(),
  // delete users
  "delete": function () {
    var _delete2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(req, res) {
      var deleteQuery, findOneQuery, _ref4, rows;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              deleteQuery = 'DELETE FROM users WHERE id=$1 returning *';
              findOneQuery = 'SELECT * FROM users WHERE id=$1';
              req.params.id = req.params.userId;
              _context4.next = 6;
              return _db["default"].query(findOneQuery, [req.params.id]);

            case 6:
              _ref4 = _context4.sent;
              rows = _ref4.rows;

              if (rows[0]) {
                _context4.next = 10;
                break;
              }

              return _context4.abrupt("return", res.status(404).send({
                status: 404,
                error: 'User not found to delete'
              }));

            case 10:
              _context4.next = 12;
              return _db["default"].query(deleteQuery, [rows[0].id]);

            case 12:
              return _context4.abrupt("return", res.status(200).send({
                status: 200,
                data: 'User successfully deleted'
              }));

            case 15:
              _context4.prev = 15;
              _context4.t0 = _context4["catch"](0);
              return _context4.abrupt("return", res.status(400).send({
                status: 400,
                error: _context4.t0
              }));

            case 18:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 15]]);
    }));

    function _delete(_x7, _x8) {
      return _delete2.apply(this, arguments);
    }

    return _delete;
  }(),
  // Reset Password
  updatePassword: function () {
    var _updatePassword = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6(req, res) {
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _async["default"].waterfall([function (done) {
                _crypto["default"].randomBytes(20, function (err, buf) {
                  var token = buf.toString('hex');
                  done(err, token);
                });
              },
              /*#__PURE__*/
              function () {
                var _ref5 = _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee5(token, user) {
                  var text, _ref6, rows, smtpTransport, mailOptions;

                  return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          text = 'SELECT * FROM users WHERE email = $1';
                          _context5.prev = 1;
                          _context5.next = 4;
                          return _db["default"].query(text, [req.body.email]);

                        case 4:
                          _ref6 = _context5.sent;
                          rows = _ref6.rows;

                          if (rows[0]) {
                            _context5.next = 8;
                            break;
                          }

                          return _context5.abrupt("return", res.status(404).send({
                            status: 404,
                            error: 'No user account with the email already exist'
                          }));

                        case 8:
                          user = rows[0];
                          _context5.next = 14;
                          break;

                        case 11:
                          _context5.prev = 11;
                          _context5.t0 = _context5["catch"](1);
                          return _context5.abrupt("return", res.status(401).send({
                            error: _context5.t0
                          }));

                        case 14:
                          smtpTransport = _nodemailer["default"].createTransport({
                            service: 'Gmail',
                            auth: {
                              user: 'wisdomvoke@gmail.com',
                              pass: process.env.GWP
                            }
                          });
                          mailOptions = {
                            to: user.email,
                            from: 'vokeolomu01@gmail.com',
                            subject: 'Password Reset',
                            text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' + "Please see below for your password: ".concat(user.password) + 'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                          };
                          smtpTransport.sendMail(mailOptions, function () {
                            console.log('mail sent');
                            return res.status(404).send({
                              status: 404,
                              info: "An email has been sent to ".concat(user.email, " containing your password")
                            });
                          });
                          return _context5.abrupt("return", null);

                        case 18:
                        case "end":
                          return _context5.stop();
                      }
                    }
                  }, _callee5, null, [[1, 11]]);
                }));

                return function (_x11, _x12) {
                  return _ref5.apply(this, arguments);
                };
              }()]);

            case 1:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    function updatePassword(_x9, _x10) {
      return _updatePassword.apply(this, arguments);
    }

    return updatePassword;
  }()
};
var _default = User;
exports["default"] = _default;
//# sourceMappingURL=userController.js.map