import moment from 'moment';
import uuid from 'uuid';

class Template {
  /**
   * class constructor
   * @param {object} data
   */
  constructor() {
    this.templates = [];
  }
  /**
   * 
   * @returns {object} car object
   */
  create(data) {
    const newTemplate = {
        status: 200,
        data:{
      id: uuid.v4(),
      manufacturer: data.manufacturer || '',
      model: data.model || '',
      price: data.price || '',
      status: data.status || '',
      dataFile: String,
      body_type: data.body_type || '',
      createdDate: moment.now(),
      modifiedDate: moment.now()
        }
    };

    this.cars.push(newTemplate);
    return newTemplate;
  }
  
  /**
   * @returns {object} returns all cars
   */
  findAll() {
    return this.cars;
  }
  
}
export default new Template();
