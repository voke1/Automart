
import express from 'express';
import User from '../usingDB/controller/userController';
import Auth from '../usingDB/middleware/checkAuth';


const router = express.Router();

// sign in user
router.post('/api/v1/auth/signin', User.getOne);

// sign up a user
router.post('/api/v1/auth/signup', User.create);

// forgot password
router.post('/api/v1/users/:useremail/reset_password', Auth, User.updatePassword);


module.exports = router;
