import "@babel/polyfill";
import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../db';

const Flag = {
  /**
   * Create A Flag
   * @param {object} req 
   * @param {object} res
   * @returns {object} flag object 
   */
  async create(req, res) {
    const text = `INSERT INTO
      flags(id, car_id, reason, description, created_on, modified_date)
      VALUES($1, $2, $3, $4, $5, $6)
      returning *`;
    const values = [
      uuidv4(),
      req.body.car_id,
      req.body.reason,
      req.body.description,
      moment(new Date()),
      moment(new Date())
    ];

    try {
      const { rows } = await db.query(text, values);
      const flag = rows[0];
      return res.status(201).send({status: 201, flag});
    } catch(error) {
      return res.status(400).send({status: 400, error});
    }
  },
  
}

export default Flag;
