import "@babel/polyfill";
import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../db';

const Car = {

    /**
   * Create A Car
   * @param {object} req 
   * @param {object} res
   * @returns {object} car object 
   */
  async create(req, res) {
    const text = `INSERT INTO
    cars(id, manufacturer, owner, model, price, state, status, body_type, created_on, modified_date)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      returning *`;
    const values = [
      uuidv4(),
      req.body.manufacturer,
      req.body.owner,
      req.body.model,
      req.body.price,
      req.body.state,
      req.body.status,
      req.body.body_type,
      moment(new Date()),
      moment(new Date())
    ];
    try {
      const { rows } = await db.query(text, values);
      const data = rows[0];
      return res.status(201).send({status: 201, data});
    } catch(error) {
      return res.status(400).send({status: 400, error});
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
        return res.status(404).send({status: 404, error: 'car not found'});
      }
      const car = rows[0];
      return res.status(200).send({status: 200, car});
    } catch(error) {
      return res.status(400).send({status: 400, error})
    }
  },
   /**
   * Update price of Car Ad
   * @param {object} req 
   * @param {object} res 
   * @returns {object} update car price
   */
  async getUpdatePrice(req, res) {
    const findOneQuery = 'SELECT * FROM cars WHERE id=$1';
    const updateOneQuery =`UPDATE cars
      SET price=$1, modified_date=$2
      WHERE id=$3 returning *`;
    try {
      req.params.id = req.params.carId;
      const { rows } = await db.query(findOneQuery, [req.params.id]);
      console.log(rows[0])
      if(!rows[0]) {
        return res.status(404).send({status: 404, error: 'car not found'});
      }
      const values = [
        req.body.price,
        moment(new Date()),
        req.params.id        
      ];
      const response = await db.query(updateOneQuery, values);
      const updatedAd = response.rows[0];
      return res.status(200).send({status: 200, updatedAd});
     } catch(err) {
       return res.status(400).send({status: 400, err});
     }
  },

   /**
   * Filter all available Cars  with price range
   * @param {object} req 
   * @param {object} res 
   * @returns {object} cars array
   */
  async getAll(req, res) {
    if('SELECT * FROM cars WHERE status = $1' == 'available'){
      const findAllQuery = 'SELECT * FROM cars';
      try {
        const { rows, rowCount } = await db.query(findAllQuery);
        return res.status(200).send({ rows, rowCount });
      } catch(error) {
        return res.status(400).send({status: 400, error});
      }
    }
    return res.status(400).send({status: 400, error: 'no available car'});
},

    /**
   * Get All Car
   * @param {object} req 
   * @param {object} res 
   * @returns {object} cars array
   */
  async getAll(req, res) {
    const findAllQuery = 'SELECT * FROM cars';
    try {
      const {rows} = await db.query(findAllQuery);
      return res.status(200).send({status: 200, rows});
    } catch(error) {
      return res.status(400).send({status: 400, error});
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
    const updateOneQuery =`UPDATE cars
      SET status=$1, modified_date=$2
      WHERE id=$3 returning *`;
    try {
      req.params.id = req.params.carId;
      const { rows } = await db.query(findOneQuery, [req.params.id]);
      if(!rows[0]) {
        return res.status(404).send({status: 404, error: 'car not found'});
      }
      
      const values = [
        req.body.status,
        moment(new Date()),
        req.params.id  
      ];
      const response = await db.query(updateOneQuery, values);
      const modifiedAdStatus =  response.rows[0];
      return res.status(200).send({status: 200, modifiedAdStatus});
     } catch(err) {
       return res.status(400).send({status: 400, err});
     }
},
    /**
   * View All available Cars
   * @param {object} req 
   * @param {object} res 
   * @returns {object} cars array
   */
  async getAvailableCars(req, res) {

        const findAvailableQuery = "SELECT status FROM cars WHERE status = 'available'";
        //try {
          try {
            const {rows} = await db.query(findAvailableQuery);
            return res.status(200).send({status: 200, rows});
          } catch(error) {
            return res.status(400).send({status: 400, error});
          }
      
      //return res.status(400).send({status: 400, error: 'no available car'});
  },
 /*
   * Delete A Car
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return statuc code 204 
   */
  async delete(req, res) {
    const deleteQuery = 'DELETE FROM cars WHERE id=$1 returning *';
    try {
      const { deletedCar } = await db.query(deleteQuery, [req.params.id]);
      if(!deletedCar[0]) {
        return res.status(404).send({status: 404, error: 'no car to delete'});
      }
      return res.status(204).send({status: 204, message: "Car Ad successfully deleted" });
    } catch(error) {
      return res.status(400).send({status: 400, error});
    }
  }
}

export default Car;
