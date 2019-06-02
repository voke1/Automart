const express = require("express");
const router = express.Router();

import Car from '../controller/car_controller';

router.get('/cars', Car.getAll);
router.post('/cars', Car.create);



module.exports = router;

