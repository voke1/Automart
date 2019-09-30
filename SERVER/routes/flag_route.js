import Auth from '../usingDB/middleware/checkAuth';
import Flag from '../usingDB/controller/flagController';
import reportAdValidation  from '../usingDB/validation/FlagAd';

const express = require('express');

const router = express.Router();

// protected route to report a posted Car Ad
router.post('/api/v1/flag', reportAdValidation, Auth, Flag.createReport);


module.exports = router;
