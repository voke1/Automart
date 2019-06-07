import moment from 'moment';
import uuid from 'uuid';

class Car {
 
  findOne(id) {
    return this.cars.find(reflect => reflect.id === id);
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
  
}
export default new Car();