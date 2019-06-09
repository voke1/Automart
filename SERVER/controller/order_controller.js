import OrderModel from '../model/order_model';

const Order = {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} order object
   */
  create(req, res) {
    if (!req.body.price && !req.body.price_offered && !req.body.status) {
      return res.status(400).send({ message: 'All fields are required' });
    }

    const order = OrderModel.create(req.body);
    return res.status(201).send(order);
  },
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} updated reflection
   */
  getUpdateOrderPrice(req, res) {
    const order = OrderModel.findOne(req.params.orderId);
    if (!order) {
      return res.status(404).send({ message: 'order not found' });
    }
    try {
      const updatedPrice = OrderModel.updateOrderPrice(req.params.orderId, req.body.new_price_offered);
      return res.status(200).send(updatedPrice);
    } catch (error) {
      return res.status(404).send({ message: 'cannot update price' });
    }
  },
};

export default Order;
