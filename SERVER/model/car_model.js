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
        data:{
      id: uuid.v4(),
      manufacturer: data.manufacturer,
      model: data.model,
      price: data.price,
      status: data.status,
      state: data.state,
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
    return this.cars.find(reflect => reflect.id === id);
  }
  
}
export default new Car();
