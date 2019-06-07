import CarModel from '../model/car_model';

const Car = {
  /**
   * 
   * @param {object} req 
   * @param {object} res
   * @returns {object} car object 
   */
  create(req, res) {
    if (!req.body.manufacturer && !req.body.price && !req.body.model) {
      return res.status(400).send({'message': 'All fields are required'})
    }
    const car = CarModel.create(req.body);
    return res.status(201).send(car);
  },
  getOne(req, res) {
    const car = CarModel.findOne(req.params.id);
    if (!car) {
      return res.status(404).send({'message': 'car not found'});
    }
    return res.status(200).send(car);
  },
  getAvailableCars(req, res){
    const cars = CarModel.findAvailableCars();
    return res.status(200).send(cars)
  },

  getUpdatePrice(req, res){
    const car = CarModel.updateCarPrice(req.params.id, req.params.price);
    return res.status(200).send(car);
  
  },
  delete(req, res){
    CarModel.delete(req.params.id);
    return res.status(204).send({"message": "Car Ad successfully deleted"});
  },

  getUpdateStatus(){
    const specifiedCar = CarModel.updateStatus(req.params.id)
    return res.status(200).send(specifiedCar);

  },

  getFilterCars(req, res){
    const cars = CarModel.findFilterCars(req.params.min_price,  req.params.max_price);
    return res.status(200).send(cars)

  },
  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @returns {object} car array
   */
  getAll(req, res) {
    const cars = CarModel.findAll();
    return res.status(200).send(cars);
  }
}

export default Car;

