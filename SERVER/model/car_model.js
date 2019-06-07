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
            manufacturer: 'String',
            model: 'String',
            price: 'Float',
            state: 'String',
            status: "String",
            body_type: "string",
        }
    };

    this.cars.push(newCar);
    return newCar;
  }
  findFilterCars(minPrice, maxPrice){
    unsoldCars = findAvailableCars();
    carRange = []

    for (var i=0; i< unsoldCars.length; i++) {
  
      if (unsoldCars[i].price <= maxPrice && unsoldCars[i].price >= minPrice ){
        carsRange.push(availableCars[i])

      } 
      
    }

    return carsRange;

  }
  
  
  /**
   * @returns {object} returns all cars
   */
  findAll() {
    return this.cars;
  }
  
}
export default new Car();