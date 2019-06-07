import moment from 'moment';
import uuid from 'uuid';

class Car {
  /**
   * class constructor
   * @param {object} data
   */
  constructor() {
    this.cars = [];
  }
  /**
   * 
   * @returns {object} car object
   */
  create(data) {
    const newCar = {
      status: 200,
      data:
      {
        id: uuid.v4(),
        created_on: moment.now(),
        manufacturer: data.manufacturer,
        model: data.model,
        price: data.price,
        state: data.state,
        status: data.status,
        body_type: data.body_type,
        createdDate: moment.now(),
        modifiedDate: moment.now()
      }
    };

    this.cars.push(newCar);
    return newCar;
  }

  /**
   * @returns {object} returns all cars
   */
  findAll() {
    return this.cars;
  }

  
  findAvailableCars(cars, stringAvailable) {

    var stringAvailable = 'available';
    var availableCars = [];

    for (var i=0; i< cars.length; i++) {
  
      if (cars[i].status == stringAvailable){
        availableCars.push(cars[i])

      } 
      
    }
    return availableCars;
  }

}
export default new Car();
