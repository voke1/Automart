
import express from 'express';
import User from '../usingDB/controller/userController';

const router = express.Router();

// sign in user
router.post('/api/v1/auth/signin', User.getOne);

// sign up a user
router.post('/api/v1/auth/signup', User.create);


// get all users including admin
router.get('/api/v1/user', User.getAll);

// delete user admin only
router.delete('/api/v1/users/:userId', User.delete);

// route to reset password
router.post('/api/v1/users/:useremail/reset_password', User.updatePassword);


module.exports = router;
