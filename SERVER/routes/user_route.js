
const express = require("express");
const router = express.Router();


import User from '../controller/user_controller';


router.post('/login', User.getOne);




module.exports = router;

