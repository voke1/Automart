import moment from 'moment';
import uuid from 'uuid';
import bcrypt from "bcrypt";


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
        datas:{
      id: uuid.v4(),
      email: data.email || '',
      firstname: data.firstname || '',
      lastname: data.lastname || '',
      password: bcrypt.hash(data.password, 10, function(error, hash){
          if(error){
              console.log(error)
          }else{

          }
      }),       
      isAdmin: data.state || '',
      createdDate: moment.now(),
      modifiedDate: moment.now()
        }
    };

    this.users.push(newUser);
    return newUser;
  }
  /**
   * 
   * @param {uuid} id
   * @returns {object} user object
   */   

  findOne(id) {
   return this.users.find(reflect => reflect.id == id);
  }
  
}
export default new User();
