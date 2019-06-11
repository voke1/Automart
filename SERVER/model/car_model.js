/* eslint-disable no-plusplus */
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
  //create a car ad
  create(data) {
    const newCar = {
        id: uuid.v4(),
        created_on: moment.now(),
        manufacturer: data.manufacturer,
        model: data.model,
        price: data.price,
        state: data.state || 'string',
        status: data.status,
        createdDate: moment.now(),
        modifiedDate: moment.now(),
    };
    //push car to cars array
    this.cars.push(newCar);
    return newCar;
  }


  /**
  *
  * @param {uuid} id
  * @returns {object} car object
  */
 //search for a single car
  findOne(id) {
    for (let i = 0; i < this.cars.length; i++) {
      if (this.cars[i].data.id === id) {
        return this.cars[i];
      }
    }
    return null;
  }
  //find cars available based on status
  findAvailableCars(status) {
    const availableCars = [];

    for (let i = 0; i < this.cars.length; i++) {
      if (this.cars[i].data.status === status) {
        availableCars.push(this.cars[i]);
      }
    }
    return availableCars;
  }
  //Update status of car ad as "sold"
  updateStatus(id) {
    const specificCar = this.findOne(id);
    specificCar.data.status = 'sold';
    return specificCar;
  }
  //filter cars based on status, minimum price and maximum price provided
  findFilterCars(status, minPrice, maxPrice) {
    const unsoldCars = findAvailableCars(status);
    const carRange = [];

    for (let i = 0; i < unsoldCars.length; i++) {
      if ((unsoldCars[i].data.price <= maxPrice) && (unsoldCars[i].data.price >= minPrice)) {
        carRange.push(unsoldCars[i]);
      }
    }
    return carRange;
  }

  /**
  *
  * @param {uuid} id
  * @returns {object} car object
  */
 //delete car ad
  deleteCar(id) {
    for (let i = 0; i < this.cars.length; i++) {
      if (this.cars[i].data.id === id) {
        this.cars.splice(i, 1);
        return ('Car Ad successfull deleted');
      }
    }
    return null;
  }
//update price of car 
  updateCarPrice(id, newPrice) {
    for (let i = 0; i < this.cars.length; i++) {
      if (this.cars[i].data.id === id) {
        this.cars[i].data.price = newPrice;
        return this.cars[i];
      }
    }
    return null;
  }

  /**
   * @returns {object} returns all cars
   */
  //return all cars available
  findAll() {
    return this.cars;
  }
}
export default new Car();
