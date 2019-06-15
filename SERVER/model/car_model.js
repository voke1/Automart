import moment from 'moment';
import uuid from 'uuid';
import { stat } from 'fs';

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
      id: uuid.v4(),
      manufacturer: data.manufacturer || '',
      model: data.model || '',
      price: data.price || '',
      status: data.status || '',
      state: data.state || '',
      body_type: data.body_type || '',
      createdDate: moment.now(),
      modifiedDate: moment.now()
        }

    this.cars.push(newCar);
    return newCar;
  }

  findNewAvailableCars(status, state, manufacturer){
    try{
    newAvailableCars = [];

    for(let i = 0; i < this.cars.length; i++){
      if(this.cars[i].status === status && this.cars[i].state === state && this.cars[i].manufacturer === manufacturer){
       newAvailableCars.push(this.cars[i])
      }

    }
  }catch(error){
    return ({error: "no car found"})
  }

    
  }
  
  /**
   * @returns {object} returns all cars
   */
  findAll() {
    return this.cars;
  }
  
}
export default new Car();
