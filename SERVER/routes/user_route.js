
const express = require("express");
const router = express.Router();


import User from '../controller/user_controller';


router.post('/api/v1/auth/login', User.getOne);

router.post('/api/v1/auth/signup', User.create);



module.exports = router;

