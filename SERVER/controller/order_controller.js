import OrderModel from '../model/order_model';

const Order = {
   /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @returns {object} updated reflection
   */
  edit(req, res) {
    const order = OrderModel.findOne(req.params.id);
    if (!order) {
      return res.status(404).send({'message': 'order not found'});
    }
    const editedOrder = OrderModel.edit(req.params.id, req.body.new_price_offered)
    return res.status(200).send(editedOrder);
  }
}

export default Order;