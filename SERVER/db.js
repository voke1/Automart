
const { Pool } = require('pg');
const dotenv = require('dotenv');


dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('connected to the db');
});

/**
 * Create Tables
 */
const createCarTables = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      cars(
        id UUID PRIMARY KEY,
        created_on VARCHAR(128) NOT NULL,
        manufacturer VARCHAR(128) NOT NULL,
        price VARCHAR(128) NOT NULL,
        owner VARCHAR(128) NOT NULL,
        state VARCHAR(128) NOT NULL,
        status VARCHAR(128) NOT NULL,
        body_type VARCHAR(128) NOT NULL,
        model VARCHAR(128) NOT NULL,
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
}

const createOrderTables = () => {
    const queryText =
      `CREATE TABLE IF NOT EXISTS
        orders(id UUID PRIMARY KEY,
            created_on VARCHAR(128) NOT NULL,
            car_id VARCHAR(128) NOT NULL,
            price VARCHAR(128) NOT NULL,
            price_offered VARCHAR(128) NOT NULL,
            buyer VARCHAR(128) NOT NULL,
            status VARCHAR(128) NOT NULL,
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
  }
  const createUserTables = () => {
    const queryText =
      `CREATE TABLE IF NOT EXISTS
        users(
          id UUID PRIMARY KEY,
          token VARCHAR(128) NOT NULL,
          email VARCHAR(128) NOT NULL,
          firstname VARCHAR(128) NOT NULL,
          lastname VARCHAR(128) NOT NULL,
          password VARCHAR(128) NOT NULL,
          is_admin VARCHAR(128) NOT NULL,
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
  }
  const createFlagTables = () => {
    const queryText =
      `CREATE TABLE IF NOT EXISTS
        flags(
          id UUID PRIMARY KEY,
          car_id VARCHAR(128) NOT NULL,
          reason VARCHAR(128) NOT NULL,
          description VARCHAR(128) NOT NULL,
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
  }
      

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
}
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
  }
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
  }

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
  }

pool.on('remove', () => {
  console.log('client removed');
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
  dropUserTables
};

require('make-runnable');

