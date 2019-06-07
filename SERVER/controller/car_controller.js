import CarModel from '../model/car_model';

const Car = {
  /**
   * 
   * @param {object} req 
   * @param {object} res
   * @returns {object} car object 
   */
  create(req, res) {
    if (!req.body.success && !req.body.lowPoint && !req.body.takeAway) {
      return res.status(400).send({'message': 'All fields are required'})
    }

    
    const car = CarModel.create(req.body);
    return res.status(201).send(car);
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


    