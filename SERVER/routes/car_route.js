const express = require("express");
const router = express.Router();

import Car from '../controller/car_controller';

router.get('/api/v1/cars', Car.getAll);
router.post('/api/v1/cars', Car.create);
router.get('/api/v1/car/:carId/', Car.getOne);

router.get('/api/v1/car?status=available', Car.getAvailableCars);


module.exports = router;

