const express = require("express");
const router = express.Router();

import Car from '../controller/car_controller';

router.get('/api/v1/car/:carId/', Car.getOne);



module.exports = router;
