const express = require("express");
const router = express.Router();
import Auth from '../usingDB/middleware/checkAuth'

import Flag from '../usingDatastructure/controller/flag_controller';


router.post('/api/v1/flag', Auth, Flag.create);



module.exports = router;

