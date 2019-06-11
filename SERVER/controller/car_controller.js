import CarModel from '../model/car_model';

const Car = {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} car object
   */
  //post car to car array (as database)
  create(req, res) {
    if (!req.body.manufacturer && !req.body.price && !req.body.model) {
      return res.status(400).send({ status: 400, error: 'All fields are required' });
    }
    const data = CarModel.create(req.body);
    data.email = req.body.email;
    return res.status(201).send({status: 201, data});
  },
  //view a specific car
  getOne(req, res) {
    const car = CarModel.findOne(req.params.carId);
    if (!car) {
      return res.status(404).send({ status: 404, error: 'car not found'});
    }
    car.data.body_type = req.body.body_type || ' ';
    car.status = 200;
    return res.status(200).send(car);
  },
  //view all available cars posted
  getAvailableCars(req, res) {
    const carsArray = CarModel.findAvailableCars(req.query.status);
    return res.status(200).send(carsArray);
  },
  //update price of car ad posted
  getUpdatePrice(req, res) {
    const car = CarModel.findOne(req.params.carId);
    if (!car) {
      return res.status(404).send({ status: 404, error: 'car not found' });
    }
    try {
      const data = CarModel.updateCarPrice(req.params.carId, req.body.price);
      return res.status(200).send({status: 200, data});
    } catch (error) {
      return res.status(404).send({ status: 404, error: 'cannot update price' });
    }
  },
  //delete a specific car in array
  delete(req, res) {
    const car = CarModel.findOne(req.params.carId);
    if (!car) {
      return res.status(404).send({ status: 404, error: 'no car to delete' });
    }
    const data = CarModel.deleteCar(req.params.carId);
    return res.status(200).send({status: 404, data});
  },
    //update status of car in array
  getUpdateStatus(req, res) {
    const car = CarModel.findOne(req.params.carId);
    if (!car) {
      return res.status(404).send({ status: 404, error: 'car not found' });
    }
    try {
      const specifiedCar = CarModel.updateStatus(req.params.carId);
      return res.status(200).send(specifiedCar);
    } catch (error) {
      return res.status(404).send({ status: 404, error: 'cannot update status' });
    }
  },
  //search for cars based on price and status
  getFilterCars(req, res) {
    try {
      const data = CarModel.findFilterCars(req.query.status, req.query.minPrice, req.query.maxPrice);
      return res.status(200).send({status: 200, data});
    } catch (error) {
      res.status(404).send({ status: 404, error: 'cannot find cars' });
    }
  },
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} car array
   */
  //find all cars
  getAll(req, res) {
    const data = CarModel.findAll();
    return res.status(200).send({status: 200, data});
  },
};

export default Car;
