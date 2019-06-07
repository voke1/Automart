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
        data:{
      id: uuid.v4(),
      car_id: data.car_id || '',
      status: data.status || '',
      price_offered: data.price_offered,
      price: data.price,
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
    for (var i = 0; i <= this.orders.length; i++) {

      if (this.orders[i].id == id) {
        return this.orders[i]
      }else{
        console.log('Enter order')
      }
    
  }
  }

  /**
   * 
   * @param {uuid} id
   * @param {object} data 
   */
  updateOrderPrice(id, new_price_offered) {
    const order = this.findOne(id);
    const index = this.orders.indexOf(order);
    if(this.orders[index].status == 'pending'){
      this.orders[index].old_price_offered = this.orders[index].price_offered
      this.orders[index].new_price_offered = new_price_offered;
      this.orders[index].modifiedDate = moment.now()
      return this.orders[index];
    }

    else{
      throw new Error;
    }
   
  }
  
}
export default new Order();
