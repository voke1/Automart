"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pg = require("pg");

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-unused-vars */
_dotenv["default"].config();

var pool = new _pg.Pool();

if (process.env.NODE_ENV === 'test') {
  pool = new _pg.Pool({
    connectionString: process.env.TEST_DATABASE_URL,
    ssl: true
  });
} else {
  pool = new _pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
  });
}

var _default = {
  /**
   * DB Query
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   */
  query: function query(text, params) {
    return new Promise(function (resolve, reject) {
      pool.query(text, params).then(function (res) {
        resolve(res);
      })["catch"](function (err) {
        reject(err);
      });
    });
  }
};
exports["default"] = _default;
//# sourceMappingURL=index.js.map