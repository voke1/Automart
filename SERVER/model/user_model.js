import moment from 'moment';
import uuid from 'uuid';


class User {
  /**
   * class constructor
   * @param {object} data
   */
  constructor() {
    this.users = [];
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
      email: data.email || '',
      firstname: data.firstname || '',
      lastname: data.lastname || '',
      password: data.password,
       
      isAdmin: data.state || '',
      createdDate: moment.now(),
      modifiedDate: moment.now()
        }
    };

    this.users.push(newUser);
    return newUser;
  }
  
}
export default new User();
