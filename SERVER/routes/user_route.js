// import User from '../usingDatastructure/controller/user_controller';
import express from 'express';
import User from '../usingDB/controller/userController';


const router = express.Router();

// sign in user
router.post('/api/v1/auth/signin', User.getOne);

// sign up a user
router.post('/api/v1/auth/signup', User.create);


module.exports = router;
