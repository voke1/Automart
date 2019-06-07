
const express = require("express");
const router = express.Router();

import Car from '../controller/car_controller';

router.get('/api/v1/car', Car.getAll);
router.post('/api/v1/car', Car.create);
router.get('/api/v1/car/:carId/', Car.getOne);
router.get('/api/v1/car?status=available', Car.getAvailableCars);
router.get('/api/v1/car/:carId', Car.delete);
router.get("/api/v1/car?status=available&min_price=XXXValue &max_price= XXXValue", Car.getFilterCars);



module.exports = router;
