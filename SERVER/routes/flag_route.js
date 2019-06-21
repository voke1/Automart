import Auth from '../usingDB/middleware/checkAuth';

import Flag from '../usingDB/controller/flagController';

const express = require('express');

const router = express.Router();


router.post('/api/v1/flag', Auth, Flag.create);


module.exports = router;
