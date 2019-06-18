import "core-js/stable";
import "regenerator-runtime/runtime";
import db from '../db';
import moment from 'moment';
import uuidv4 from 'uuid/v4';


const Order = {

    /**
   * Create A Order
   * @param {object} req 
   * @param {object} res
   * @returns {object} order object 
   */
  async create(req, res) {
    const text = `INSERT INTO
      orders(id, car_id, buyer, price, price_offered, status, created_on, modified_date)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)
      returning *`;
    const values = [
      uuidv4(),
      req.body.car_id,
      req.body.buyer,
      req.body.price,
      req.body.price_offered,
      req.body.status,
      moment(new Date()),
      moment(new Date())
    ];
    try {
      const { rows } = await db.query(text, values);
      const order = (rows[0])
      return res.status(201).send({status: 201, order});
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
  async getUpdateOrderPrice(req, res) {
    const findOneQuery = 'SELECT * FROM orders WHERE id=$1';
    
    const updateOneQuery =`UPDATE orders
      SET car_id=$1,price=$2,price_offered=$3, old_price_offered=$4, new_price_offered=$5, modified_date=$6
      WHERE id=$7 returning *`;
    try {
       req.params.id = req.params.orderId;
      const { rows } = await db.query(findOneQuery, [req.params.id]);
      console.log(rows[0])
      console.log(req.params.id)
      
      if(!rows[0]) {
        return res.status(404).send({status: 404, error : 'order not found'});
      }
      else if(rows[0].status === 'pending'){
        req.body.old_price_offered = rows[0].price_offered;
        req.body.new_price_offered = req.body.price_offered;
        const values = [
          req.body.car_id,
          req.body.price,
          req.body.price_offered,
          req.body.old_price_offered,
          req.body.new_price_offered,
          moment(new Date()),
          req.params.id
          
        ];
        const response = await db.query(updateOneQuery, values);
        const modifiedOrder = response.rows[0]
        return res.status(200).send({status: 200, modifiedOrder});
      }
      else{
        return res.status(404).send({status: 404, message: `cannot update price, status is ${rows[0].status}`});
      }
      
      
     
     } catch(err) {
       return res.status(400).send(err);
     }
  },
}

export default Order;
