import Car from '../usingDB/controller/carController';
import Auth from '../usingDB/middleware/checkAuth';
import express from 'express';


const router = express.Router();

//view all Ads available
router.get('/api/v1/car', function(req, res, next){
    if(req.query.status === 'available'){
        
         res.send(Car.getAvailableCars())
    } 
     next();
});

//admin view all car whether sold or available
router.get('/api/v1/car', Auth, Car.getAll);

//post car Ad
router.post('/api/v1/car', Auth, Car.create);

//View a specific car Ad
router.get('/api/v1/car/:carId/',  Car.getOne);

//View all unsold cars of a specific make
//router.get('/api/v1/car?status=available&state=new', Car.getNewAvailableCars);

//View all unsold cars of a specific make
//router.get('/api/v1/car?status=available&state=used', Car.getUsedAvailableCars);

//route to delete a specific car ad
router.delete('/api/v1/car/:carId', Auth, Car.delete);

//route to view range of car ad available based on price
//router.get('/api/v1/car?status=available&minPrice=XXXValue &maxPrice= XXXValue', Car.getFilterCars);


//route to view cars ad by bodyType
//router.get('api/v1/car?body_type=bodyType', Car.getCarByBodyType) 

//update status of a particular ad
router.patch('/api/v1/car/:carId/status', Auth, Car.getUpdateStatus);

//router.get('api/v1/car?status=available&manufacturer=XXXValue', Car.getAvailableCarsByMake)

//update price of a particular Ad
router.patch('/api/v1/car/:carId/price', Auth, Car.getUpdatePrice);


module.exports = router;
