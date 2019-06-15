const express = require("express");
const router = express.Router();

import Flag from '../usingDatastructure/controller/flag_controller';


router.post('/api/v1/flag', Flag.create);



module.exports = router;

