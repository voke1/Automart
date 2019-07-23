"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("@babel/polyfill");

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

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
      var result, img_url, filename, text, decode, values, _ref, rows, data;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _cloudinary["default"].config({
                cloud_name: process.env.CLOUD_NAME,
                api_key: process.env.API_KEY,
                api_secret: process.env.API_SECRET
              });

              if (!req.files) {
                _context.next = 8;
                break;
              }

              if (!req.files.image_url) {
                _context.next = 8;
                break;
              }

              filename = req.files.image_url.path;
              _context.next = 6;
              return _cloudinary["default"].uploader.upload(filename, {
                tags: 'gotemps',
                resource_type: 'auto'
              })["catch"](function (err) {
                if (err) {
                  console.warn(err);
                }
              });

            case 6:
              result = _context.sent;
              img_url = result.secure_url;

            case 8:
              text = "INSERT INTO\n    cars(id, manufacturer, owner, model, price, state, status, body_type, img_url, created_on, modified_date)\n    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)\n      returning *"; // get user id from user token

              decode = _jsonwebtoken["default"].verify(req.headers.token, process.env.TOKEN);
              req.body.owner = decode.id;
              values = [(0, _v["default"])(), req.body.manufacturer, req.body.owner, req.body.model, req.body.price, req.body.state, req.body.status, req.body.body_type, img_url, (0, _moment["default"])(new Date()), (0, _moment["default"])(new Date())];
              _context.prev = 12;

              if (!(!req.body.price || !req.body.state)) {
                _context.next = 15;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                status: 400,
                error: 'please enter required fields'
              }));

            case 15:
              _context.next = 17;
              return _db["default"].query(text, values);

            case 17:
              _ref = _context.sent;
              rows = _ref.rows;
              data = rows[0];
              return _context.abrupt("return", res.status(201).send({
                status: 201,
                data: data,
                info: 'Car Ad successfully posted'
              }));

            case 23:
              _context.prev = 23;
              _context.t0 = _context["catch"](12);
              return _context.abrupt("return", res.status(400).send({
                status: 400,
                err: _context.t0
              }));

            case 26:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[12, 23]]);
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
      var text, _ref2, rows, data;

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
              data = rows[0];
              return _context2.abrupt("return", res.status(200).send({
                status: 200,
                data: data
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
      var findOneQuery, updateOneQuery, _ref3, rows, values, response, data;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              findOneQuery = 'SELECT * FROM cars WHERE id=$1';
              updateOneQuery = "UPDATE cars\n      SET price=$1, modified_date=$2\n      WHERE id=$3 returning *";
              _context3.prev = 2;

              if (req.body.price) {
                _context3.next = 5;
                break;
              }

              return _context3.abrupt("return", res.status(422).send({
                status: 422,
                error: 'please fill in required fields'
              }));

            case 5:
              req.params.id = req.params.carId;
              _context3.next = 8;
              return _db["default"].query(findOneQuery, [req.params.id]);

            case 8:
              _ref3 = _context3.sent;
              rows = _ref3.rows;

              if (rows[0]) {
                _context3.next = 12;
                break;
              }

              return _context3.abrupt("return", res.status(404).send({
                status: 404,
                error: 'car not found'
              }));

            case 12:
              values = [req.body.price, (0, _moment["default"])(new Date()), req.params.id];
              _context3.next = 15;
              return _db["default"].query(updateOneQuery, values);

            case 15:
              response = _context3.sent;
              data = response.rows[0];
              return _context3.abrupt("return", res.status(200).send({
                status: 200,
                data: data
              }));

            case 20:
              _context3.prev = 20;
              _context3.t0 = _context3["catch"](2);
              return _context3.abrupt("return", res.status(400).send({
                status: 400,
                error: _context3.t0
              }));

            case 23:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[2, 20]]);
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
      var _findAllQuery, _ref4, rows, _findAllQuery2, _ref5, _rows, _findAllQuery3, _ref6, _rows2, _findAllQuery4, _ref7, _rows3, carRange, findAllQuery, _ref8, _rows4, _findAllQuery5, _ref9, _rows5, decode, result, _findAllQuery6, _ref10, _rows6, data;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!(req.query.status === 'available')) {
                _context4.next = 68;
                break;
              }

              if (!(req.query.state === 'new')) {
                _context4.next = 14;
                break;
              }

              _findAllQuery = "SELECT * FROM cars WHERE status = 'available' AND state = 'new'";
              _context4.prev = 3;
              _context4.next = 6;
              return _db["default"].query(_findAllQuery);

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

              _findAllQuery2 = "SELECT * FROM cars WHERE status = 'available' AND state = 'used'";
              _context4.prev = 16;
              _context4.next = 19;
              return _db["default"].query(_findAllQuery2);

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

              _findAllQuery3 = "SELECT * FROM cars WHERE status = 'available' AND manufacturer = '".concat(req.query.manufacturer, "' ");
              _context4.prev = 29;
              _context4.next = 32;
              return _db["default"].query(_findAllQuery3);

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
                _context4.next = 54;
                break;
              }

              _findAllQuery4 = "SELECT * FROM cars WHERE status = 'available' AND price BETWEEN '".concat(req.query.min_price, "' AND '").concat(req.query.max_price, "' ");
              _context4.prev = 42;
              _context4.next = 45;
              return _db["default"].query(_findAllQuery4);

            case 45:
              _ref7 = _context4.sent;
              _rows3 = _ref7.rows;
              carRange = _rows3;
              return _context4.abrupt("return", res.status(200).send({
                status: 200,
                carRange: carRange
              }));

            case 51:
              _context4.prev = 51;
              _context4.t3 = _context4["catch"](42);
              return _context4.abrupt("return", res.status(400).send({
                status: 400,
                error: _context4.t3
              }));

            case 54:
              // Return all available car Ads
              findAllQuery = "SELECT * FROM cars WHERE status = 'available'";
              _context4.prev = 55;
              _context4.next = 58;
              return _db["default"].query(findAllQuery);

            case 58:
              _ref8 = _context4.sent;
              _rows4 = _ref8.rows;

              if (!(_rows4 === [])) {
                _context4.next = 62;
                break;
              }

              return _context4.abrupt("return", res.status(200).send({
                status: 201,
                message: 'No available Car Ads'
              }));

            case 62:
              return _context4.abrupt("return", res.status(200).send({
                status: 200,
                rows: _rows4
              }));

            case 65:
              _context4.prev = 65;
              _context4.t4 = _context4["catch"](55);
              return _context4.abrupt("return", res.status(400).send({
                status: 400,
                error: _context4.t4
              }));

            case 68:
              if (!req.query.body_type) {
                _context4.next = 81;
                break;
              }

              _findAllQuery5 = "SELECT * FROM cars WHERE  body_type = '".concat(req.query.body_type, "'");
              _context4.prev = 70;
              _context4.next = 73;
              return _db["default"].query(_findAllQuery5);

            case 73:
              _ref9 = _context4.sent;
              _rows5 = _ref9.rows;
              return _context4.abrupt("return", res.status(200).send({
                status: 200,
                rows: _rows5
              }));

            case 78:
              _context4.prev = 78;
              _context4.t5 = _context4["catch"](70);
              return _context4.abrupt("return", res.status(400).send({
                status: 400,
                error: "Cannot find car of ".concat(req.query.body_type, " body type")
              }));

            case 81:
              _context4.prev = 81;
              _context4.next = 84;
              return _jsonwebtoken["default"].verify(req.headers.token, process.env.TOKEN);

            case 84:
              decode = _context4.sent;
              result = decode.isAdmin;

              if (!(result === 'false')) {
                _context4.next = 88;
                break;
              }

              return _context4.abrupt("return", res.status(400).send({
                status: 400,
                error: 'User is not Admin'
              }));

            case 88:
              _findAllQuery6 = 'SELECT * FROM cars';
              _context4.next = 91;
              return _db["default"].query(_findAllQuery6);

            case 91:
              _ref10 = _context4.sent;
              _rows6 = _ref10.rows;
              data = _rows6;
              return _context4.abrupt("return", res.status(200).send({
                status: 200,
                data: data
              }));

            case 97:
              _context4.prev = 97;
              _context4.t6 = _context4["catch"](81);
              return _context4.abrupt("return", res.status(400).send({
                status: 400,
                error: _context4.t6
              }));

            case 100:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[3, 11], [16, 24], [29, 37], [42, 51], [55, 65], [70, 78], [81, 97]]);
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
      var findOneQuery, updateOneQuery, _ref11, rows, values, response, data;

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
                _context5.next = 10;
                break;
              }

              return _context5.abrupt("return", res.status(404).send({
                status: 404,
                error: 'car Ad not found'
              }));

            case 10:
              if (!(rows[0].status === 'sold')) {
                _context5.next = 12;
                break;
              }

              return _context5.abrupt("return", res.status(404).send({
                status: 404,
                error: "Cannot update. car Ad is already ".concat(rows[0].status)
              }));

            case 12:
              values = [req.body.status, (0, _moment["default"])(new Date()), req.params.id];
              _context5.next = 15;
              return _db["default"].query(updateOneQuery, values);

            case 15:
              response = _context5.sent;
              data = response.rows[0];
              return _context5.abrupt("return", res.status(200).send({
                status: 200,
                data: data
              }));

            case 20:
              _context5.prev = 20;
              _context5.t0 = _context5["catch"](2);
              return _context5.abrupt("return", res.status(400).send({
                status: 400,
                err: _context5.t0
              }));

            case 23:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[2, 20]]);
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
  // delete a specific Car Ad (Admins only)
  "delete": function () {
    var _delete2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6(req, res) {
      var decode, deleteQuery, findOneQuery, _ref12, rows;

      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              decode = _jsonwebtoken["default"].verify(req.headers.token, process.env.TOKEN);
              _context6.prev = 1;

              if (!(decode.isAdmin === 'false')) {
                _context6.next = 4;
                break;
              }

              return _context6.abrupt("return", res.status(400).send({
                status: 400,
                error: 'User is not Admin'
              }));

            case 4:
              deleteQuery = 'DELETE FROM cars WHERE id=$1 returning *';
              findOneQuery = 'SELECT * FROM cars WHERE id=$1';
              req.params.id = req.params.carId;
              _context6.next = 9;
              return _db["default"].query(findOneQuery, [req.params.id]);

            case 9:
              _ref12 = _context6.sent;
              rows = _ref12.rows;

              if (rows[0]) {
                _context6.next = 13;
                break;
              }

              return _context6.abrupt("return", res.status(404).send({
                status: 404,
                error: 'Car Ad not found to delete'
              }));

            case 13:
              _context6.next = 15;
              return _db["default"].query(deleteQuery, [rows[0].id]);

            case 15:
              return _context6.abrupt("return", res.status(200).send({
                status: 200,
                data: 'Car Ad successfully deleted'
              }));

            case 18:
              _context6.prev = 18;
              _context6.t0 = _context6["catch"](1);
              return _context6.abrupt("return", res.status(400).send({
                status: 400,
                error: _context6.t0
              }));

            case 21:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[1, 18]]);
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