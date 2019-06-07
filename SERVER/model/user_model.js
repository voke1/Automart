

 var uuid = require("uuid");
 var bcrypt = require('bcrypt');



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
      id: uuid.v4() || '',
      token: data.token || '',
      email: data.email || '',
      firstname: data.firstname || '',
      lastname: data.lastname || '',
      password: bcrypt.hashSync(data.password, 10, function(error, hash){
          if(error){
              console.log(error)
          }else{

          }
      }) || '',       
      isAdmin: data.state || '',
        }
    };

    this.users.push(newUser);
    console.log(newUser);
    return newUser;
  }

  /**
   * 
   * @param {uuid} id
   * @returns {object} user object
   */
  findOne(id) {
    for (var i = 0; i <= this.cars.length; i++) {

      if (this.cars[i].id == id) {
        return this.cars[i]
      }
    
  }
  }
  /**
   * @returns {object} returns all users
   */
  findAll() {
    return this.users;
  }
  
}
exports.default = new User();
