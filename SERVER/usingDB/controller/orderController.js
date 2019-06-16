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
  /**
   * Update A Order
   * @param {object} req 
   * @param {object} res 
   * @returns {object} updated order
   */
  async update(req, res) {
    const findOneQuery = 'SELECT * FROM orders WHERE id=$1';
    const updateOneQuery =`UPDATE orders
      SET car_id=$1,price=$2,price_offered=$3,modified_date=$4, old_price_offered=$5
      WHERE id=$6 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.id]);
      if(!rows[0]) {
        return res.status(404).send({'message': 'order not found'});
      }
      //const oldPriceOffered = 'SELECT price FROM orders WHERE id = $3;'
      const values = [
        req.body.car_id || rows[0].success,
        req.body.low_point || rows[0].low_point,
        req.body.take_away || rows[0].take_away,
        moment(new Date()),
        req.body.price_offered,
        req.params.id
        
      ];
      const response = await db.query(updateOneQuery, values);
      return res.status(200).send(response.rows[0]);
    } catch(err) {
      return res.status(400).send(err);
    }
  },
}

export default Order;
