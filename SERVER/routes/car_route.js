const express = require("express");
const router = express.Router();

import Car from '../controller/car_controller';

router.get('/car/', Car.getAll);



module.exports = router;




