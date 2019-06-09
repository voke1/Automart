import User from '../controller/user_controller';

const express = require('express');

const router = express.Router();


router.post('/api/v1/auth/signin', User.getOne);

router.post('/api/v1/auth/signup', User.create);


module.exports = router;
