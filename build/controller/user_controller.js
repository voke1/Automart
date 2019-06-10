"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _user_model = _interopRequireDefault(require("../model/user_model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

require('dotenv').config();

var User = {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  //sign up a single user
  create: function create(req, res) {
    try {
      req.body.token = _jsonwebtoken["default"].sign(req.body.email, process.env.TOKEN);

      var user = _user_model["default"]["default"].create(req.body);

      return res.status(201).send(user);
    } catch (error) {
      return res.status(400).send({
        message: 'email and password are required'
      });
    }
  },

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} Users array
   */
  //get all users
  getAll: function getAll(req, res) {
    var users = _user_model["default"].findAll();

    return res.status(200).send(users);
  },

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  //sign in a specific user
  getOne: function getOne(req, res) {
    var user = _user_model["default"]["default"].findOne(req.body.email);

    if (!user) {
      return res.status(404).send({
        message: 'user not found'
      });
    }

    try {
      _bcrypt["default"].compare(req.body.password, _user_model["default"].password, function (error, result) {
        if (error) {
          return res.status(401).send({
            message: 'Auth failed'
          });
        }

        if (result) {
          return res.status(200).send({
            ' message': 'Auth successful'
          });
        }
      });

      return res.status(200).send(user);
    } catch (error) {
      return res.status(401).send({
        message: 'Enter valid email and password'
      });
    }
  }
};
var _default = User;
exports["default"] = _default;
//# sourceMappingURL=user_controller.js.map