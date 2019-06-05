const express = require("express");
const router = express.Router();


import User from '../controller/user_controller';


router.post('/signup', User.create);



module.exports = router;

