
/* eslint-disable no-unused-vars */
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
let pool = new Pool();

// use test database for mocha tests
if (process.env.NODE_ENV === 'test') {
  pool = new Pool({

    connectionString: process.env.TEST_DATABASE_URL, ssl: true,
  });
  // use production database
} else {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL, ssl: true,
  });
}

export default {
  /**
    query database
   */
  query(text, params) {
    return new Promise((resolve, reject) => {
      pool.query(text, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
