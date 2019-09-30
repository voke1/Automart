// import Order from '../usingDatastructure/controller/order_controller';
import express from 'express';
import Order from '../usingDB/controller/orderController';
import Auth from '../usingDB/middleware/checkAuth';
import createOrderValidation from '../usingDB/validation/createOrder';

const router = express.Router();

// protected route to post order
router.post('/api/v1/order', createOrderValidation, Auth, Order.createOrder);

// protected route to update price of posted order
router.patch('/api/v1/order/:orderId/price', Auth, Order.getUpdateOrderPrice);


module.exports = router;
