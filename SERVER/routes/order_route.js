// import Order from '../usingDatastructure/controller/order_controller';
import express from 'express';
import Order from '../usingDB/controller/orderController';
import Auth from '../usingDB/middleware/checkAuth';

const router = express.Router();

// protected route to post order
router.post('/api/v1/order', Auth, Order.createOrder);

// protected route to update price of posted order
router.patch('/api/v1/order/:orderId/price', Auth, Order.getUpdateOrderPrice);


module.exports = router;
