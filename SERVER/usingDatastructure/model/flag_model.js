import moment from 'moment';
import uuid from 'uuid';

class Flag {
  /**
   * class constructor
   * @param {object} data
   */
  constructor() {
    this.flags = [];
  }
  /**
   * 
   * @returns {object} flag object
   */
  create(data) {
    const newFlag = {
  
      id: uuid.v4(),
      carId: data.carId,
      reason: data.reason || '',
      description: data.description || '',
      state: data.state || '',
      createdDate: moment.now(),
      modifiedDate: moment.now()
        }
    

    this.flags.push(newFlag);
    return newFlag;
  }
  
  /**
   * @returns {object} returns all flags
   */
  findAll() {
    return this.flags;
  }
  
}
export default new Flag();
