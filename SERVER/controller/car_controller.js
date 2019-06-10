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
      return res.status(400).send({ message: 'All fields are required' });
    }
    const car = CarModel.create(req.body);
    car.data.email = req.body.email;
    return res.status(201).send(car);
  },
  //view a specific car
  getOne(req, res) {
    const car = CarModel.findOne(req.params.carId);
    if (!car) {
      return res.status(404).send({ message: 'car not found' });
    }
    car.data.body_type = req.body.body_type || ' ';
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
      return res.status(404).send({ message: 'car not found' });
    }
    try {
      const car = CarModel.updateCarPrice(req.params.carId, req.body.price);
      return res.status(200).send(car);
    } catch (error) {
      return res.status(404).send({ message: 'cannot update price' });
    }
  },
  //delete a specific car in array
  delete(req, res) {
    const car = CarModel.findOne(req.params.carId);
    if (!car) {
      return res.status(404).send({ message: 'no car to delete' });
    }
    const deleted = CarModel.deleteCar(req.params.carId);
    return res.status(200).send(deleted);
  },
    //update status of car in array
  getUpdateStatus(req, res) {
    const car = CarModel.findOne(req.params.carId);
    if (!car) {
      return res.status(404).send({ message: 'car not found' });
    }
    try {
      const specifiedCar = CarModel.updateStatus(req.params.carId);
      return res.status(200).send(specifiedCar);
    } catch (error) {
      return res.status(404).send({ message: 'cannot update status' });
    }
  },
  //search for cars based on price and status
  getFilterCars(req, res) {
    try {
      const cars = CarModel.findFilterCars(req.query.status, req.query.minPrice, req.query.maxPrice);
      return res.status(200).send(cars);
    } catch (error) {
      res.status(404).send({ message: 'cannot find cars' });
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
    const cars = CarModel.findAll();
    return res.status(200).send(cars);
  },
};

export default Car;
