const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

import User from '../controller/user_controller';


router.post('/signup', User.create);



module.exports = router;

