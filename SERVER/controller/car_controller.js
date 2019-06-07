import CarModel from '../model/car_model';

const Car = {

    /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return statuc code 204 
   */
  delete(req, res) {
    const car = CarModel.findOne(req.params.id);
    if (!car) {
      return res.status(404).send({'message': 'car not found'});
    }
    const ref = CarModel.delete(req.params.id);
    return res.status(204).send(ref);
  }
}

export default Car;

