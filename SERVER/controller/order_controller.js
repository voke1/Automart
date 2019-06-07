import OrderModel from '../model/order_model';

const Order = {
   /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @returns {object} updated reflection
   */
  getUpdateOrderPrice(req, res) {
    const order = OrderModel.findOne(req.params.id);
    if (!order) {
      return res.status(404).send({'message': 'order not found'});
    }
    else if(OrderModel[order].status == 'pending'){
      const updatedPrice = OrderModel.updateOrderPrice(req.params.id, req.body.new_price_offered)
      return res.status(200).send(updatedPrice);
    }
    else{
      return res.status(404).send({'message': "cannot update order price"});
    }
    
  }
}

export default Order;