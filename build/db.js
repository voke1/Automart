"use strict";

var _require = require('pg'),
    Pool = _require.Pool;

var dotenv = require('dotenv');

dotenv.config();
var pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});
pool.on('connect', function () {
  console.log('connected to the db');
});
/**
 * Create Tables
 */

var createCarTables = function createCarTables() {
  var queryText = "CREATE TABLE IF NOT EXISTS\n      cars(\n        id UUID PRIMARY KEY,\n        created_on VARCHAR(128) NOT NULL,\n        manufacturer VARCHAR(128) ,\n        price VARCHAR(128) ,\n        owner VARCHAR(128) ,\n        state VARCHAR(128) ,\n        status VARCHAR(128) ,\n        body_type VARCHAR(128) ,\n        model VARCHAR(128) ,\n        created_date TIMESTAMP,\n        modified_date TIMESTAMP\n      )";
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
};

var createOrderTables = function createOrderTables() {
  var queryText = "CREATE TABLE IF NOT EXISTS\n        orders(\n            id UUID PRIMARY KEY,\n            created_on VARCHAR(128) NOT NULL,\n            car_id VARCHAR(128),\n            price VARCHAR(128) NOT NULL,\n            price_offered VARCHAR(128) NOT NULL,\n            old_price_offered VARCHAR(128),\n            new_price_offered VARCHAR(128),\n            buyer VARCHAR(128),\n            status VARCHAR(128)NOT NULL,\n            created_date TIMESTAMP,\n            modified_date TIMESTAMP\n        )";
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
};

var createUserTables = function createUserTables() {
  var queryText = "CREATE TABLE IF NOT EXISTS\n        users(\n          id UUID PRIMARY KEY,\n          token VARCHAR(128) NOT NULL,\n          email VARCHAR(128) NOT NULL,\n          firstname VARCHAR(128) NOT NULL,\n          lastname VARCHAR(128) NOT NULL,\n          password VARCHAR(128) NOT NULL,\n          is_admin VARCHAR(128) NOT NULL,\n          created_date TIMESTAMP,\n          modified_date TIMESTAMP\n        )";
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
};

var createFlagTables = function createFlagTables() {
  var queryText = "CREATE TABLE IF NOT EXISTS\n        flags(\n          id UUID PRIMARY KEY,\n          car_id VARCHAR(128) NOT NULL,\n          reason VARCHAR(128) NOT NULL,\n          description VARCHAR(128) NOT NULL,\n          created_on TIMESTAMP,\n          modified_date TIMESTAMP\n        )";
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
};
/**
 * Drop Tables
 */


var dropCarTables = function dropCarTables() {
  var queryText = 'DROP TABLE IF EXISTS cars';
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
};
/**
 * Drop Tables
 */


var dropOrderTables = function dropOrderTables() {
  var queryText = 'DROP TABLE IF EXISTS orders';
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
};
/**
* Drop Tables
*/


var dropUserTables = function dropUserTables() {
  var queryText = 'DROP TABLE IF EXISTS users';
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
};
/**
* Drop Tables
*/


var dropFlagTables = function dropFlagTables() {
  var queryText = 'DROP TABLE IF EXISTS flags';
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
};

pool.on('remove', function () {
  console.log('client removed');
  process.exit(0);
});
module.exports = {
  createCarTables: createCarTables,
  createFlagTables: createFlagTables,
  createOrderTables: createOrderTables,
  createUserTables: createUserTables,
  dropCarTables: dropCarTables,
  dropFlagTables: dropFlagTables,
  dropOrderTables: dropOrderTables,
  dropUserTables: dropUserTables
};

require('make-runnable');
//# sourceMappingURL=db.js.map