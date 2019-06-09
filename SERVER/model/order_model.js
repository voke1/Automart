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
    const newOrder = {
      status: 200,
      data: {
        id: uuid.v4(),
        car_id: data.car_id || '',
        status: data.status || '',
        price_offered: data.price_offered,
        price: data.price,
        modifiedDate: moment.now(),
      },
    };


    this.orders.push(newOrder);
    return newOrder;
  }

  /**
  *
  * @param {uuid} id
  * @returns {object} order object
  */
  findOne(id) {
    try {
      for (let i = 0; i < this.orders.length; i++) {
        if (this.orders[i].data.id === id) {
          return this.orders[i];
        }
      }
    } catch (error) {
      return null;
    }
  }

  /**
   *
   * @param {uuid} id
   * @param {object} data
   */
  updateOrderPrice(id, newPriceOffered) {
    const order = this.findOne(id);
    const index = this.orders.indexOf(order);
    if (this.orders[index].data.status === 'pending') {
      this.orders[index].data.old_price_offered = this.orders[index].data.price_offered;
      this.orders[index].data.new_price_offered = newPriceOffered;
      this.orders[index].data.modifiedDate = moment.now();
      return this.orders[index];
    }


    throw new Error();
  }
}
export default new Order();
