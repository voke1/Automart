import Order from '../controller/order_controller';

import express from 'express';

const router = express.Router();

//post order
router.post('/api/v1/order', Order.create);

//update price of posted order
router.patch('/api/v1/order/:orderId/price', Order.getUpdateOrderPrice);


module.exports = router;
