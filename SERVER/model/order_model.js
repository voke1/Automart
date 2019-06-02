
import moment from 'moment';
import uuid from 'uuid';


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
    const newUser = {
        status: 200,
        data:{
      id: uuid.v4(),
      car_id: data.car_id || '',
      status: data.status || '',
      old_price_offered: data.old_price_offered || '',
      new_price_offered: data.new_price_offered,
      modifiedDate: moment.now(),
        }
    }

    this.orders.push(newOrder);
    return newOrder;
  }
   /**
   * 
   * @param {uuid} id
   * @returns {object} order object
   */
  findOne(id) {
    return this.orders.find(reflect => reflect.id === id);
  }

  /**
   * 
   * @param {uuid} id
   * @param {object} data 
   */
  edit(id, new_price_offered) {
    const order = this.findOne(id);
    const index = this.orders.indexOf(order);
    this.orders[index].old_price_offered = new_price_offered;
    this.orders[index].modifiedDate = moment.now()
    return this.orders[index];
  }
  
}
export default new Order();
