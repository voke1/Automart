const express = require("express");
const router = express.Router();

import Car from '../controller/car_controller';

router.get('/cars/:carId', Car.delete);



module.exports = router;




