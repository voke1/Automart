
const express = require("express");
const router = express.Router();

import Car from '../controller/car_controller';

router.get("/api/v1/car?status=available&min_price= XXXValue &max_price= XXXValue", Car.getAll);



module.exports = router;
