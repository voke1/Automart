import OrderModel from '../model/order_model';

const Order = {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} order object
   */
  //post order to array (as database)
  create(req, res) {
    if (!req.body.price && !req.body.price_offered && !req.body.status) {
      return res.status(400).send({ status: 400, error: 'All fields are required' });
    }

    const order = OrderModel.create(req.body);
    return res.status(201).send({status: 201, order});
  },
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} 
   */
  //update price of order already posted
  getUpdateOrderPrice(req, res) {
    const order = OrderModel.findOne(req.params.orderId);
    if (!order) {
      return res.status(404).send({ status: 404, error: 'order not found' });
    }
    try {
      const data = OrderModel.updateOrderPrice(req.params.orderId, req.body.price_offered);
      return res.status(200).send({status: 200, data});
    } catch (error) {
      return res.status(404).send({ status: 404, error: 'cannot update price' });
    }
  },
};

export default Order;
