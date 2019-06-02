
import moment from 'moment';
import uuid from 'uuid';
const bcrypt = require("bcrypt");

class Order {
  /**
   * class constructor
   * @param {object} data
   */
  constructor() {
    this.orders = [];
  }
  /**
   * 
   * @returns {object} car object
   */
  create(data) {
    const newOrder = {
        status: 200,
        data:{
      id: uuid.v4(),
      car_id: data.car_id || '',
      status: data.status || '',
      price: data.price || '',
      price_offered: data.price_offered,
      created_on: moment.now(),
      modifiedDate: moment.now()
        }
    };

    this.users.push(newOrder);
    return newOrder;
  }
  
}
export default new Order();
