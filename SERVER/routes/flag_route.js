const express = require("express");
const router = express.Router();

import Flag from '../controller/flag_controller';


router.post('/api/v1/flag', Flag.create);



module.exports = router;

