import express from 'express';
import Car from '../usingDB/controller/carController';
import Auth from '../usingDB/middleware/checkAuth';
import uploadImage from '../usingDB/middleware/imageUpload'


const router = express.Router();

// view Car Ads based on input query
router.get('/api/v1/car', Auth, Car.getAll);

// post car Ad
router.post('/api/v1/car', Auth, Car.create);

// View a specific car Ad
router.get('/api/v1/car/:carId/', Car.getOne);

// route to delete a specific car ad
router.delete('/api/v1/car/:carId', Auth, Car.delete);

// update status of a particular ad
router.patch('/api/v1/car/:carId/status', Auth, Car.getUpdateStatus);


// update price of a particular Ad
router.patch('/api/v1/car/:carId/price', Auth, Car.getUpdatePrice);


module.exports = router;
