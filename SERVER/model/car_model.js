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
  * 
  * @param {uuid} id
  * @returns {object} car object
  */
  findOne(id) {

   // return this.cars.find(reflect => reflect.id === id);

    for (var i = 0; i <= this.cars.length; i++) {

      if (this.cars[i].id == id) {
        return this.cars[i]
      }
    
  }

}


  findAvailableCars(cars) {
    var availableCars = [];

    for (var i = 0; i < cars.length; i++) {

      if (cars[i].status == 'available') {
        availableCars.push(cars[i])
      }

    }
    return availableCars;
  }

  updateStatus(id){
    var specificCar = findOne(id);
    specificCar.status = "sold";

    
  }

  findFilterCars(minPrice, maxPrice) {
    unsoldCars = findAvailableCars();
    carRange = []

    for (var i = 0; i < unsoldCars.length; i++) {

      if (unsoldCars[i].price <= maxPrice && unsoldCars[i].price >= minPrice) {
        carsRange.push(availableCars[i])

      }

    }
    return carsRange;
  }

  /**
 * 
 * @param {uuid} id 
 */
  delete(id) {
    const car = this.findOne(id);
    const index = this.cars.indexOf(car);
    this.cars.splice(index, 1);
    return {};
  }
  updateCarPrice(id, newPrice){
    const car = this.findOne(id);
    const index = this.cars.indexOf(car);
    this.cars[index].status = newPrice;
  }



  /**
   * @returns {object} returns all cars
   */
  findAll() {
    return this.cars;
  }

}
export default new Car();

