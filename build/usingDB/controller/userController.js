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

var _db = _interopRequireDefault(require("../db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
      var text, values, _ref, rows, user;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              text = "INSERT INTO\n      Users(id, token, email, firstname, lastname, password, is_admin, created_date, modified_date)\n      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)\n      returning *"; // handling no input value to sign up a user.

              if (!(!req.body.email || !req.body.password)) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                status: 400,
                error: 'please fill in required fields'
              }));

            case 3:
              // eslint-disable-next-line no-unused-expressions
              // this.findUser;
              req.body.token = _jsonwebtoken["default"].sign(req.body.email, process.env.TOKEN);
              values = [(0, _v["default"])(), req.body.token, req.body.email, req.body.firstname, req.body.lastname, // eslint-disable-next-line no-unused-vars
              _bcrypt["default"].hashSync(req.body.password, 10, function (error, hash) {
                if (error) {
                  return {
                    message: 'error found'
                  };
                }

                return null;
              }) || '', req.body.is_admin, (0, _moment["default"])(new Date()), (0, _moment["default"])(new Date())];
              _context.prev = 5;
              _context.next = 8;
              return _db["default"].query(text, values);

            case 8:
              _ref = _context.sent;
              rows = _ref.rows;
              user = rows[0];
              return _context.abrupt("return", res.status(201).send({
                status: 201,
                user: user
              }));

            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](5);
              return _context.abrupt("return", res.status(400).send({
                status: 400,
                error: _context.t0
              }));

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[5, 14]]);
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
                error: "A user with the specified ".concat(req.body.email, " was not found")
              }));

            case 8:
              _bcrypt["default"].compare(req.body.password, rows[0].password, function (error, result) {
                if (error) {
                  return res.status(401).send({
                    status: 401,
                    Authentication_failed: 'Authorization information is missing or invalid'
                  });
                }

                if (result) {
                  var signedUser = rows[0];
                  return res.status(200).send({
                    status: 200,
                    signedUser: signedUser
                  });
                }

                return null;
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
  }()
};
var _default = User;
exports["default"] = _default;
//# sourceMappingURL=userController.js.map