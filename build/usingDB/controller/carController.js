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

var Car = {
  /**
  * Create A Car Ad
  * @param {object} req 
  * @param {object} res
  * @returns {object} car object 
  */
  create: function () {
    var _create = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res) {
      var text, values, _ref, rows, data;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              text = "INSERT INTO\n    cars(id, manufacturer, owner, model, price, state, status, body_type, created_on, modified_date)\n    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)\n      returning *";
              values = [(0, _v["default"])(), req.body.manufacturer, req.body.owner, req.body.model, req.body.price, req.body.state, req.body.status, req.body.body_type, (0, _moment["default"])(new Date()), (0, _moment["default"])(new Date())];
              _context.prev = 2;
              _context.next = 5;
              return _db["default"].query(text, values);

            case 5:
              _ref = _context.sent;
              rows = _ref.rows;
              data = rows[0];
              return _context.abrupt("return", res.status(201).send({
                status: 201,
                data: data
              }));

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](2);
              return _context.abrupt("return", res.status(400).send({
                status: 400,
                error: _context.t0
              }));

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 11]]);
    }));

    function create(_x, _x2) {
      return _create.apply(this, arguments);
    }

    return create;
  }(),

  /**
  * View a specific Car
  * @param {object} req 
  * @param {object} res
  * @returns {object} car object
  */
  getOne: function () {
    var _getOne = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res) {
      var text, _ref2, rows, car;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              text = 'SELECT * FROM cars WHERE id = $1';
              _context2.prev = 1;
              req.params.id = req.params.carId;
              _context2.next = 5;
              return _db["default"].query(text, [req.params.id]);

            case 5:
              _ref2 = _context2.sent;
              rows = _ref2.rows;

              if (rows[0]) {
                _context2.next = 9;
                break;
              }

              return _context2.abrupt("return", res.status(404).send({
                status: 404,
                error: 'car not found'
              }));

            case 9:
              car = rows[0];
              return _context2.abrupt("return", res.status(200).send({
                status: 200,
                car: car
              }));

            case 13:
              _context2.prev = 13;
              _context2.t0 = _context2["catch"](1);
              return _context2.abrupt("return", res.status(400).send({
                status: 400,
                error: _context2.t0
              }));

            case 16:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 13]]);
    }));

    function getOne(_x3, _x4) {
      return _getOne.apply(this, arguments);
    }

    return getOne;
  }(),

  /**
  * Update price of Car Ad
  * @param {object} req 
  * @param {object} res 
  * @returns {object} update price of Car Ad
  */
  getUpdatePrice: function () {
    var _getUpdatePrice = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(req, res) {
      var findOneQuery, updateOneQuery, _ref3, rows, values, response, updatedAd;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              findOneQuery = 'SELECT * FROM cars WHERE id=$1';
              updateOneQuery = "UPDATE cars\n      SET price=$1, modified_date=$2\n      WHERE id=$3 returning *";
              _context3.prev = 2;
              req.params.id = req.params.carId;
              _context3.next = 6;
              return _db["default"].query(findOneQuery, [req.params.id]);

            case 6:
              _ref3 = _context3.sent;
              rows = _ref3.rows;

              if (rows[0]) {
                _context3.next = 10;
                break;
              }

              return _context3.abrupt("return", res.status(404).send({
                status: 404,
                error: 'car not found'
              }));

            case 10:
              values = [req.body.price, (0, _moment["default"])(new Date()), req.params.id];
              _context3.next = 13;
              return _db["default"].query(updateOneQuery, values);

            case 13:
              response = _context3.sent;
              updatedAd = response.rows[0];
              return _context3.abrupt("return", res.status(200).send({
                status: 200,
                updatedAd: updatedAd
              }));

            case 18:
              _context3.prev = 18;
              _context3.t0 = _context3["catch"](2);
              return _context3.abrupt("return", res.status(400).send({
                status: 400,
                err: _context3.t0
              }));

            case 21:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[2, 18]]);
    }));

    function getUpdatePrice(_x5, _x6) {
      return _getUpdatePrice.apply(this, arguments);
    }

    return getUpdatePrice;
  }(),

  /**
  * Filter Cars by input query
  * @param {object} req 
  * @param {object} res 
  * @returns {object} cars array
  */
  getAll: function () {
    var _getAll = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(req, res) {
      var _findAllQuery2, _ref4, rows, _findAllQuery3, _ref5, _rows, _findAllQuery4, _ref6, _rows2, _findAllQuery5, _ref7, _rows3, carRange, _findAllQuery, _ref8, _rows4, _findAllQuery6, _ref9, _rows5, findAllQuery, _ref10, _rows6;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!(req.query.status === 'available')) {
                _context4.next = 63;
                break;
              }

              if (!(req.query.state === 'new')) {
                _context4.next = 14;
                break;
              }

              _findAllQuery2 = "SELECT * FROM cars WHERE status = 'available' AND state = 'new'";
              _context4.prev = 3;
              _context4.next = 6;
              return _db["default"].query(_findAllQuery2);

            case 6:
              _ref4 = _context4.sent;
              rows = _ref4.rows;
              return _context4.abrupt("return", res.status(200).send({
                rows: rows
              }));

            case 11:
              _context4.prev = 11;
              _context4.t0 = _context4["catch"](3);
              return _context4.abrupt("return", res.status(400).send({
                status: 400,
                error: _context4.t0
              }));

            case 14:
              if (!(req.query.state === 'used')) {
                _context4.next = 27;
                break;
              }

              _findAllQuery3 = "SELECT * FROM cars WHERE status = 'available' AND state = 'used'";
              _context4.prev = 16;
              _context4.next = 19;
              return _db["default"].query(_findAllQuery3);

            case 19:
              _ref5 = _context4.sent;
              _rows = _ref5.rows;
              return _context4.abrupt("return", res.status(200).send({
                rows: _rows
              }));

            case 24:
              _context4.prev = 24;
              _context4.t1 = _context4["catch"](16);
              return _context4.abrupt("return", res.status(400).send({
                status: 400,
                error: _context4.t1
              }));

            case 27:
              if (!req.query.manufacturer) {
                _context4.next = 40;
                break;
              }

              _findAllQuery4 = "SELECT * FROM cars WHERE status = 'available' AND manufacturer = '".concat(req.query.manufacturer, "' ");
              _context4.prev = 29;
              _context4.next = 32;
              return _db["default"].query(_findAllQuery4);

            case 32:
              _ref6 = _context4.sent;
              _rows2 = _ref6.rows;
              return _context4.abrupt("return", res.status(200).send({
                status: 200,
                rows: _rows2
              }));

            case 37:
              _context4.prev = 37;
              _context4.t2 = _context4["catch"](29);
              return _context4.abrupt("return", res.status(400).send({
                status: 400,
                error: _context4.t2
              }));

            case 40:
              if (!req.query.min_price) {
                _context4.next = 49;
                break;
              }

              console.log('price testing');
              _findAllQuery5 = "SELECT * FROM cars WHERE status = 'available' AND price BETWEEN '".concat(req.query.min_price, "' AND '").concat(req.query.max_price, "' "); //try {

              _context4.next = 45;
              return _db["default"].query(_findAllQuery5);

            case 45:
              _ref7 = _context4.sent;
              _rows3 = _ref7.rows;
              carRange = _rows3;
              return _context4.abrupt("return", res.status(200).send({
                status: 200,
                carRange: carRange
              }));

            case 49:
              //Return all available car Ads
              _findAllQuery = "SELECT * FROM cars WHERE status = 'available'";
              _context4.prev = 50;
              _context4.next = 53;
              return _db["default"].query(_findAllQuery);

            case 53:
              _ref8 = _context4.sent;
              _rows4 = _ref8.rows;

              if (!(_rows4 === [])) {
                _context4.next = 57;
                break;
              }

              return _context4.abrupt("return", res.status(200).send({
                status: 201,
                message: 'No available Car Ads'
              }));

            case 57:
              return _context4.abrupt("return", res.status(200).send({
                status: 200,
                rows: _rows4
              }));

            case 60:
              _context4.prev = 60;
              _context4.t3 = _context4["catch"](50);
              return _context4.abrupt("return", res.status(400).send({
                status: 400,
                error: _context4.t3
              }));

            case 63:
              if (!req.query.body_type) {
                _context4.next = 76;
                break;
              }

              _findAllQuery6 = "SELECT * FROM cars WHERE  body_type = '".concat(req.query.body_type, "'");
              _context4.prev = 65;
              _context4.next = 68;
              return _db["default"].query(_findAllQuery6);

            case 68:
              _ref9 = _context4.sent;
              _rows5 = _ref9.rows;
              return _context4.abrupt("return", res.status(200).send({
                status: 200,
                rows: _rows5
              }));

            case 73:
              _context4.prev = 73;
              _context4.t4 = _context4["catch"](65);
              return _context4.abrupt("return", res.status(400).send({
                status: 400,
                error: "Cannot find car of ".concat(req.query.body_type, " body type")
              }));

            case 76:
              findAllQuery = 'SELECT * FROM cars';
              _context4.prev = 77;
              _context4.next = 80;
              return _db["default"].query(findAllQuery);

            case 80:
              _ref10 = _context4.sent;
              _rows6 = _ref10.rows;
              return _context4.abrupt("return", res.status(200).send({
                status: 200,
                rows: _rows6
              }));

            case 85:
              _context4.prev = 85;
              _context4.t5 = _context4["catch"](77);
              return _context4.abrupt("return", res.status(400).send({
                status: 400,
                error: _context4.t5
              }));

            case 88:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[3, 11], [16, 24], [29, 37], [50, 60], [65, 73], [77, 85]]);
    }));

    function getAll(_x7, _x8) {
      return _getAll.apply(this, arguments);
    }

    return getAll;
  }(),

  /**
   * Mark a Car Ad as sold
   * @param {object} req 
   * @param {object} res 
   * @returns {object} updated car
   */
  getUpdateStatus: function () {
    var _getUpdateStatus = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(req, res) {
      var findOneQuery, updateOneQuery, _ref11, rows, values, response, modifiedAdStatus;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              findOneQuery = 'SELECT * FROM cars WHERE id=$1';
              updateOneQuery = "UPDATE cars\n      SET status=$1, modified_date=$2\n      WHERE id=$3 returning *";
              _context5.prev = 2;
              req.params.id = req.params.carId;
              _context5.next = 6;
              return _db["default"].query(findOneQuery, [req.params.id]);

            case 6:
              _ref11 = _context5.sent;
              rows = _ref11.rows;

              if (rows[0]) {
                _context5.next = 12;
                break;
              }

              return _context5.abrupt("return", res.status(404).send({
                status: 404,
                error: 'car Ad not found'
              }));

            case 12:
              if (!(rows[0].status === 'sold')) {
                _context5.next = 14;
                break;
              }

              return _context5.abrupt("return", res.status(404).send({
                status: 404,
                error: "Cannot update. car Ad is already ".concat(rows[0].status)
              }));

            case 14:
              values = [req.body.status, (0, _moment["default"])(new Date()), req.params.id];
              _context5.next = 17;
              return _db["default"].query(updateOneQuery, values);

            case 17:
              response = _context5.sent;
              modifiedAdStatus = response.rows[0];
              return _context5.abrupt("return", res.status(200).send({
                status: 200,
                modifiedAdStatus: modifiedAdStatus
              }));

            case 22:
              _context5.prev = 22;
              _context5.t0 = _context5["catch"](2);
              return _context5.abrupt("return", res.status(400).send({
                status: 400,
                err: _context5.t0
              }));

            case 25:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[2, 22]]);
    }));

    function getUpdateStatus(_x9, _x10) {
      return _getUpdateStatus.apply(this, arguments);
    }

    return getUpdateStatus;
  }(),

  /*
    * Delete A Car
    * @param {object} req 
    * @param {object} res 
    * @returns {void} return statuc code 204 
    */
  "delete": function () {
    var _delete2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6(req, res) {
      var deleteQuery, _ref12, rows;

      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              deleteQuery = 'DELETE FROM cars WHERE id=$1 returning *';
              _context6.prev = 1;
              req.params.id = req.params.carId;
              _context6.next = 5;
              return _db["default"].query(deleteQuery, [req.params.id]);

            case 5:
              _ref12 = _context6.sent;
              rows = _ref12.rows;

              if (rows[0]) {
                _context6.next = 9;
                break;
              }

              return _context6.abrupt("return", res.status(404).send({
                status: 404,
                error: 'Car Ad not found to delete'
              }));

            case 9:
              return _context6.abrupt("return", res.status(204).send({
                status: 204,
                message: "Car Ad successfully deleted"
              }));

            case 12:
              _context6.prev = 12;
              _context6.t0 = _context6["catch"](1);
              return _context6.abrupt("return", res.status(400).send({
                status: 400,
                error: _context6.t0
              }));

            case 15:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[1, 12]]);
    }));

    function _delete(_x11, _x12) {
      return _delete2.apply(this, arguments);
    }

    return _delete;
  }()
};
var _default = Car;
exports["default"] = _default;
//# sourceMappingURL=carController.js.map