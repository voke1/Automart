import '@babel/polyfill';
import cloudinary from 'cloudinary';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../db';


const Car = {

  /**
 * Create A Car Ad
 * @param {object} req
 * @param {object} res
 * @returns {object} car object
 */

  async create(req, res) {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
    let result;
    let img_url;

    // checks if Car Ad image is present to upload to cloudinary account
    if (req.files) {
      if (req.files.image_url) {
        const filename = req.files.image_url.path;
        result = await cloudinary.uploader.upload(filename, { tags: 'gotemps', resource_type: 'auto' })
          .catch((err) => {
            if (err) {
              console.warn(err);
            }
          });
        img_url = result.secure_url;
      }
    }
    const text = `INSERT INTO
    cars(id, manufacturer, owner, model, price, state, status, body_type, img_url, created_on, modified_date)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      returning *`;
    // get user id from user token
    const decode = jwt.verify(req.headers.token, process.env.TOKEN);
    req.body.owner = decode.id;

    const values = [
      uuidv4(),
      req.body.manufacturer,
      req.body.owner,
      req.body.model,
      req.body.price,
      req.body.state,
      req.body.status,
      req.body.body_type,
      img_url,
      moment(new Date()),
      moment(new Date()),
    ];
    try {
      // validation to handle no input values to post a Car Ad.
      if (!req.body.price || !req.body.state) {
        return res.status(400).send({ status: 400, error: 'please enter required fields' });
      }
      // post Car Ad
      const { rows } = await db.query(text, values);
      const data = rows[0];
      return res.status(201).send({ status: 201, data, info: 'Car Ad successfully posted' });
    } catch (err) {
      return res.status(400).send({ status: 400, err });
    }
  },

  /**
 * View a specific Car
 * @param {object} req
 * @param {object} res
 * @returns {object} car object
 */
  async getOne(req, res) {
    const text = 'SELECT * FROM cars WHERE id = $1';
    try {
      req.params.id = req.params.carId;
      const { rows } = await db.query(text, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({ status: 404, error: 'car not found' });
      }
      const data = rows[0];
      return res.status(200).send({ status: 200, data });
    } catch (error) {
      return res.status(400).send({ status: 400, error });
    }
  },
  /**
  * Update price of Car Ad
  * @param {object} req
  * @param {object} res
  * @returns {object} update price of Car Ad
  */
  async getUpdatePrice(req, res) {
    const findOneQuery = 'SELECT * FROM cars WHERE id=$1';
    const updateOneQuery = `UPDATE cars
      SET price=$1, modified_date=$2
      WHERE id=$3 returning *`;
    try {
      if (!req.body.price) {
        return res.status(422).send({ status: 422, error: 'please fill in required fields' });
      }
      req.params.id = req.params.carId;
      const { rows } = await db.query(findOneQuery, [req.params.id]);

      if (!rows[0]) {
        return res.status(404).send({ status: 404, error: 'car not found' });
      }
      const values = [
        req.body.price,
        moment(new Date()),
        req.params.id,
      ];
      const response = await db.query(updateOneQuery, values);
      const data = response.rows[0];
      return res.status(200).send({ status: 200, data });
    } catch (error) {
      return res.status(400).send({ status: 400, error });
    }
  },

  /**
 * Filter Cars by input query
 * @param {object} req
 * @param {object} res
 * @returns {object} cars array
 */
  async getAll(req, res) {
    if (req.query.status === 'available') {
      // return all new available cars
      if (req.query.state === 'new') {
        const findAllQuery = "SELECT * FROM cars WHERE status = 'available' AND state = 'new'";
        try {
          const { rows } = await db.query(findAllQuery);
          return res.status(200).send({ rows });
        } catch (error) {
          return res.status(400).send({ status: 400, error });
        }
      }
      // return all used available cars
      if (req.query.state === 'used') {
        const findAllQuery = "SELECT * FROM cars WHERE status = 'available' AND state = 'used'";
        try {
          const { rows } = await db.query(findAllQuery);
          return res.status(200).send({ rows });
        } catch (error) {
          return res.status(400).send({ status: 400, error });
        }
      }
      // return all available Car Ads of specified make (manufacturer)
      if (req.query.manufacturer) {
        const findAllQuery = `SELECT * FROM cars WHERE status = 'available' AND manufacturer = '${req.query.manufacturer}' `;
        try {
          const { rows } = await db.query(findAllQuery);
          return res.status(200).send({ status: 200, rows });
        } catch (error) {
          return res.status(400).send({ status: 400, error });
        }
      }
      // return all available car Ads within a specified price range
      if (req.query.min_price) {
        const findAllQuery = `SELECT * FROM cars WHERE status = 'available' AND price BETWEEN '${req.query.min_price}' AND '${req.query.max_price}' `;
        try {
          const { rows } = await db.query(findAllQuery);
          const carRange = rows;
          return res.status(200).send({ status: 200, carRange });
        } catch (error) {
          return res.status(400).send({ status: 400, error });
        }
      }
      // Return all available car Ads
      const findAllQuery = "SELECT * FROM cars WHERE status = 'available'";
      try {
        const { rows } = await db.query(findAllQuery);
        if (rows === []) {
          return res.status(200).send({ status: 201, message: 'No available Car Ads' });
        }
        return res.status(200).send({ status: 200, rows });
      } catch (error) {
        return res.status(400).send({ status: 400, error });
      }
    }
    // return all car Ads with specific body type
    if (req.query.body_type) {
      const findAllQuery = `SELECT * FROM cars WHERE  body_type = '${req.query.body_type}'`;
      try {
        const { rows } = await db.query(findAllQuery);
        return res.status(200).send({ status: 200, rows });
      } catch (error) {
        return res.status(400).send({ status: 400, error: `Cannot find car of ${req.query.body_type} body type` });
      }
    }

    // view all Cars (Admins only)
    try {
      const decode = await jwt.verify(req.headers.token, process.env.TOKEN);
      const result = decode.isAdmin;

      if (result === 'false') {
        return res.status(400).send({ status: 400, error: 'User is not Admin' });
      }
      const findAllQuery = 'SELECT * FROM cars';

      const { rows } = await db.query(findAllQuery);
      const data = rows;
      return res.status(200).send({ status: 200, data });
    } catch (error) {
      return res.status(400).send({ status: 400, error });
    }
  },
  /**
   * Mark a Car Ad as sold
   * @param {object} req
   * @param {object} res
   * @returns {object} updated car
   */
  async getUpdateStatus(req, res) {
    const findOneQuery = 'SELECT * FROM cars WHERE id=$1';
    const updateOneQuery = `UPDATE cars
      SET status=$1, modified_date=$2
      WHERE id=$3 returning *`;
    try {
      req.params.id = req.params.carId;
      const { rows } = await db.query(findOneQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({ status: 404, error: 'car Ad not found' });
      }
      if (rows[0].status === 'sold') {
        return res.status(404).send({ status: 404, error: `Cannot update. car Ad is already ${rows[0].status}` });
      }

      const values = [
        req.body.status,
        moment(new Date()),
        req.params.id,
      ];
      const response = await db.query(updateOneQuery, values);
      const data = response.rows[0];
      return res.status(200).send({ status: 200, data });
    } catch (err) {
      return res.status(400).send({ status: 400, err });
    }
  },
  /*
    * Delete A Car
    * @param {object} req
    * @param {object} res
    * @returns {void} return statuc code 204  
    */

  // delete a specific Car Ad (Admins only)
  async delete(req, res) {
    const decode = jwt.verify(req.headers.token, process.env.TOKEN);
    try {
      if (decode.isAdmin === 'false') {
        return res.status(400).send({ status: 400, error: 'User is not Admin' });
      }
      const deleteQuery = 'DELETE FROM cars WHERE id=$1 returning *';
      const findOneQuery = 'SELECT * FROM cars WHERE id=$1';

      req.params.id = req.params.carId;
      const { rows } = await db.query(findOneQuery, [req.params.id]);

      if (!rows[0]) {
        return res.status(404).send({ status: 404, error: 'Car Ad not found to delete' });
      }
      await db.query(deleteQuery, [rows[0].id]);
      return res.status(200).send({ status: 200, data: 'Car Ad successfully deleted' });
    } catch (error) {
      return res.status(400).send({ status: 400, error });
    }
  },
};

export default Car;
