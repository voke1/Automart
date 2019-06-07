import orderModel from '../model/order_model';

const Order = {
  /**
   * 
   * @param {object} req 
   * @param {object} res
   * @returns {object} order object 
   */
  create(req, res) {
    if (!req.body.price && !req.body.price_offered && !req.body.status) {
      return res.status(400).send({'message': 'All fields are required'})
    }
    const order = orderModel.create(req.body);
    return res.status(201).send(order);
  },
  
}

export default Order;