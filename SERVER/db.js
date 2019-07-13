/* eslint-disable no-unused-vars */

const { Pool } = require('pg');
const dotenv = require('dotenv');


dotenv.config();

let pool = new Pool();

if (process.env.NODE_ENV === 'test') {
  pool = new Pool({

    connectionString: process.env.TEST_DATABASE_URL, ssl: true,
  });
} else {
  pool = new Pool({

    connectionString: process.env.DATABASE_URL, ssl: true,
  });
}

pool.on('connect', () => {
  console.log('connected to the db');
});

/**
 * Create Tables
 */
const createCarTables = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      cars(
        id UUID PRIMARY KEY,
        created_on VARCHAR(128),
        manufacturer VARCHAR(128) ,
        price VARCHAR(128) ,
        owner VARCHAR(128) ,
        state VARCHAR(128) ,
        status VARCHAR(128) ,
        body_type VARCHAR(128) ,
        img_url VARCHAR(128),
        model VARCHAR(128) ,
        created_date TIMESTAMP,
        modified_date TIMESTAMP
      )`;
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const createOrderTables = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
        orders(
            id UUID PRIMARY KEY,
            created_on VARCHAR(128),
            car_id VARCHAR(128),
            price VARCHAR(128),
            price_offered VARCHAR(128),
            old_price_offered VARCHAR(128),
            new_price_offered VARCHAR(128),
            buyer VARCHAR(128),
            status VARCHAR(128),
            created_date TIMESTAMP,
            modified_date TIMESTAMP
        )`;
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};
const createUserTables = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
        users(
          id UUID PRIMARY KEY,
          token VARCHAR(8000),
          email VARCHAR(128),
          first_name VARCHAR(128),
          last_name VARCHAR(128),
          password VARCHAR(128),
          is_admin BOOL DEFAULT 'f',
          address VARCHAR(128),
          created_date TIMESTAMP,
          modified_date TIMESTAMP,
          resetPasswordToken VARCHAR(128),
          resetPasswordExpires VARCHAR(128)
        )`;
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};
const createFlagTables = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
        flags(
          id UUID PRIMARY KEY,
          car_id VARCHAR(128),
          reason VARCHAR(128),
          description VARCHAR(128),
          created_on TIMESTAMP,
          modified_date TIMESTAMP
        )`;
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


/**
 * Drop Tables
 */
const dropCarTables = () => {
  const queryText = 'DROP TABLE IF EXISTS cars';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};
/**
 * Drop Tables
 */
const dropOrderTables = () => {
  const queryText = 'DROP TABLE IF EXISTS orders';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};
/**
 * Drop Tables
 */
const dropUserTables = () => {
  const queryText = 'DROP TABLE IF EXISTS users';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop Tables
 */
const dropFlagTables = () => {
  const queryText = 'DROP TABLE IF EXISTS flags';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

pool.on('remove', () => {
  process.exit(0);
});

module.exports = {
  createCarTables,
  createFlagTables,
  createOrderTables,
  createUserTables,
  dropCarTables,
  dropFlagTables,
  dropOrderTables,
  dropUserTables,
};

// eslint-disable-next-line import/no-extraneous-dependencies
require('make-runnable');
