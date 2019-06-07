import CarModel from '../model/car_model';

const Car = {
  /**
   * 
   * @param {object} req 
   * @param {object} res
   * @returns {object} car object 
   */
  create(req, res) {
    if (!req.body.status && !req.body.price && !req.body.manufacturer) {
      return res.status(400).send({'message': 'All fields are required'})
    }

    
    const car = CarModel.create(req.body);
    return res.status(201).send(car);
  },
  
  getAvailableCars(req, res){
    const cars = CarModel.findAvailableCars();
    return res.status(200).send(cars)
    
  }
}

export default Car;