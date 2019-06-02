const express = require("express");
const router = express.Router();

import Order from '../controller/order_controller';


router.patch('/order/:orderID/price', Order.edit);



module.exports = router;

