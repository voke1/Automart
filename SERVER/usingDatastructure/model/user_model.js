

const uuid = require('uuid');
const bcrypt = require('bcrypt');


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
  //create user
  create(data) {
    const newUser = { 
        id: uuid.v4() || '',
        token: data.token || '',
        email: data.email || '',
        firstname: data.firstname || '',
        lastname: data.lastname || '',
        password: bcrypt.hashSync(data.password, 10, (error, hash) => {
          if (error) {
            return ({ message: 'error found' });
          }
        }) || '',
        isAdmin: data.state || '',
      
    };

    this.users.push(newUser);
    return newUser;
  }

  /**
   *
   * @param {uuid} id
   * @returns {object} user object
   */
  //find a single user
  // eslint-disable-next-line consistent-return
  findOne(id) {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].email === id) {
        return this.users[i];
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
