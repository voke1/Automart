"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var uuid = require('uuid');

var bcrypt = require('bcrypt');

var User =
/*#__PURE__*/
function () {
  /**
   * class constructor
   * @param {object} data
   */
  function User() {
    _classCallCheck(this, User);

    this.users = [];
  }
  /**
   *
   * @returns {object} car object
   */
  //create user


  _createClass(User, [{
    key: "create",
    value: function create(data) {
      var newUser = {
        id: uuid.v4() || '',
        token: data.token || '',
        email: data.email || '',
        firstname: data.firstname || '',
        lastname: data.lastname || '',
        password: bcrypt.hashSync(data.password, 10, function (error, hash) {
          if (error) {
            return {
              message: 'error found'
            };
          }
        }) || '',
        isAdmin: data.state || ''
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

  }, {
    key: "findOne",
    value: function findOne(id) {
      // eslint-disable-next-line no-plusplus
      for (var i = 0; i < this.users.length; i++) {
        if (this.users[i].data.email === id) {
          return this.users[i];
        }
      }
    }
    /**
     * @returns {object} returns all users
     */

  }, {
    key: "findAll",
    value: function findAll() {
      return this.users;
    }
  }]);

  return User;
}();

exports["default"] = new User();
//# sourceMappingURL=user_model.js.map