"use strict";

/* eslint-disable no-unused-vars */
var _require = require('pg'),
    Pool = _require.Pool;

var dotenv = require('dotenv');

dotenv.config();
var pool = new Pool();

if (process.env.NODE_ENV === 'test') {
  pool = new Pool({
    connectionString: process.env.TEST_DATABASE_URL,
    ssl: true
  });
} else {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
  });
}

pool.on('connect', function () {
  console.log('connected to the db');
}); // create car, user, order and flag tables

var createCarTables = function createCarTables() {
  var queryText = "CREATE TABLE IF NOT EXISTS\n      cars(\n        id UUID PRIMARY KEY,\n        created_on VARCHAR(128),\n        manufacturer VARCHAR(128) ,\n        price VARCHAR(128) ,\n        owner VARCHAR(128) ,\n        state VARCHAR(128) ,\n        status VARCHAR(128) ,\n        body_type VARCHAR(128) ,\n        img_url VARCHAR(128),\n        model VARCHAR(128) ,\n        created_date TIMESTAMP,\n        modified_date TIMESTAMP\n      )";
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
};

var createOrderTables = function createOrderTables() {
  var queryText = "CREATE TABLE IF NOT EXISTS\n        orders(\n            id UUID PRIMARY KEY,\n            created_on VARCHAR(128),\n            car_id VARCHAR(128),\n            price VARCHAR(128),\n            price_offered VARCHAR(128),\n            old_price_offered VARCHAR(128),\n            new_price_offered VARCHAR(128),\n            buyer VARCHAR(128),\n            status VARCHAR(128),\n            created_date TIMESTAMP,\n            modified_date TIMESTAMP\n        )";
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
};

var createUserTables = function createUserTables() {
  var queryText = "CREATE TABLE IF NOT EXISTS\n        users(\n          id UUID PRIMARY KEY,\n          token VARCHAR(8000),\n          email VARCHAR(128),\n          first_name VARCHAR(128),\n          last_name VARCHAR(128),\n          password VARCHAR(128),\n          is_admin BOOL DEFAULT 'f',\n          address VARCHAR(128),\n          created_date TIMESTAMP,\n          modified_date TIMESTAMP,\n          resetPasswordToken VARCHAR(128),\n          resetPasswordExpires VARCHAR(128)\n        )";
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
};

var createFlagTables = function createFlagTables() {
  var queryText = "CREATE TABLE IF NOT EXISTS\n        flags(\n          id UUID PRIMARY KEY,\n          car_id VARCHAR(128),\n          reason VARCHAR(128),\n          description VARCHAR(128),\n          created_on TIMESTAMP,\n          modified_date TIMESTAMP\n        )";
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
}; // delete Car Tables


var dropCarTables = function dropCarTables() {
  var queryText = 'DROP TABLE IF EXISTS cars';
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
}; // delete order tables


var dropOrderTables = function dropOrderTables() {
  var queryText = 'DROP TABLE IF EXISTS orders';
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
}; // delete user tables


var dropUserTables = function dropUserTables() {
  var queryText = 'DROP TABLE IF EXISTS users';
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
}; // delete flag tables


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
}; // eslint-disable-next-line import/no-extraneous-dependencies

require('make-runnable');
//# sourceMappingURL=db.js.map