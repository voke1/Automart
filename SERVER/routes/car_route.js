const express = require("express");
const router = express.Router();

import Car from '../controller/car_controller';

router.get('/api/v1/cars', Car.getAll);
router.post('/api/v1/cars', Car.create);



module.exports = router;

