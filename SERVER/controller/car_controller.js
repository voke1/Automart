
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
  getOne(req, res) {
    const car = CarModel.findOne(req.params.id);
    if (!car) {
      return res.status(404).send({'message': 'car not found'});
    }
    return res.status(200).send(car);
  },
}

export default Car;
