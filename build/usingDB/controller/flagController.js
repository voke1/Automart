"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("@babel/polyfill");

var _moment = _interopRequireDefault(require("moment"));

var _v = _interopRequireDefault(require("uuid/v4"));

var _db = _interopRequireDefault(require("../db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Flag = {
  /**
   * Create A Flag
   * @param {object} req
   * @param {object} res
   * @returns {object} flag object
   */
  create: function () {
    var _create = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res) {
      var text, values, _ref, rows, flag;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              text = "INSERT INTO\n      flags(id, car_id, reason, description, created_on, modified_date)\n      VALUES($1, $2, $3, $4, $5, $6)\n      returning *";
              values = [(0, _v["default"])(), req.body.car_id, req.body.reason, req.body.description, (0, _moment["default"])(new Date()), (0, _moment["default"])(new Date())];
              _context.prev = 2;

              if (req.body.reason) {
                _context.next = 5;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                status: 400,
                error: 'please enter car Id and reason for report'
              }));

            case 5:
              _context.next = 7;
              return _db["default"].query(text, values);

            case 7:
              _ref = _context.sent;
              rows = _ref.rows;
              flag = rows[0];
              return _context.abrupt("return", res.status(201).send({
                status: 201,
                flag: flag
              }));

            case 13:
              _context.prev = 13;
              _context.t0 = _context["catch"](2);
              return _context.abrupt("return", res.status(400).send({
                status: 400,
                error: _context.t0
              }));

            case 16:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 13]]);
    }));

    function create(_x, _x2) {
      return _create.apply(this, arguments);
    }

    return create;
  }()
};
var _default = Flag;
exports["default"] = _default;
//# sourceMappingURL=flagController.js.map