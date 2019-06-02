import moment from 'moment';
import uuid from 'uuid';
const bcrypt = require("bcrypt");

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
      password: bcrypt.hash(data.password, 10, (err, hash) => {
        if(err){
            return res.status(500).json({error: err})
            
        }else{}
      }),
      isAdmin: data.state || '',
      createdDate: moment.now(),
      modifiedDate: moment.now()
        }
    };

    this.users.push(newUser);
    return newUser;
  }
  
}
export default new Car();
