import Car from '../controller/car_controller';

const express = require('express');

const router = express.Router();

//admin view all car whether sold or available
router.get('/api/v1/car', Car.getAll);

//post car Ad
router.post('/api/v1/car', Car.create);

//View a specific car Ad
router.get('/api/v1/car/:carId/', Car.getOne);

//view all Ads available
router.get('/api/v1/car?status=available', Car.getAvailableCars);

//route to delete a specific car ad
router.delete('/api/v1/car/:carId', Car.delete);

//route to view range of car ad available based on price
router.get('/api/v1/car?status=available&minPrice=XXXValue &maxPrice= XXXValue', Car.getFilterCars);

//update status of a particular ad
router.patch('/api/v1/car/:carId/status', Car.getUpdateStatus);

//update price of a particular Ad
router.patch('/api/v1/car/:carId/price', Car.getUpdatePrice);


module.exports = router;
