const express = require("express");
const router = express.Router();

import Car from '../controller/car_controller';

router.post('/cars', Car.create);



module.exports = router;

