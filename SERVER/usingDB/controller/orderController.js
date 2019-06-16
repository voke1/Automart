import db from '../db';

const Order = {

    /**
   * Create A Order
   * @param {object} req 
   * @param {object} res
   * @returns {object} order object 
   */
  async create(req, res) {
    const text = `INSERT INTO
      orders(id, car_id, price, price_offered, status, created_on, modified_date)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      returning *`;
    const values = [
      uuidv4(),
      req.body.car_id,
      req.body.price,
      req.body.price_offered,
      req.body.status,
      moment(new Date()),
      moment(new Date())
    ];
    try {
      const { rows } = await db.query(text, values);
      return res.status(201).send(rows[0]);
    } catch(error) {
      return res.status(400).send({status: 400, error});
    }
  },
}

export default Order;