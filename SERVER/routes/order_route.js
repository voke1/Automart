const express = require("express");
const router = express.Router();

import Order from '../controller/order_controller';


router.patch('api/v1/order/:orderId/price', Order.getUpdateOrderPrice);



module.exports = router;

