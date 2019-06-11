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

      return res.status(201).send({
        status: 201,
        user: user
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        error: 'email and password are required'
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

    return res.status(200).send({
      status: 200,
      users: users
    });
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
        status: 404,
        error: 'user not found'
      });
    }

    try {
      _bcrypt["default"].compare(req.body.password, _user_model["default"].password, function (error, result) {
        if (error) {
          return res.status(401).send({
            status: 401,
            message: 'Auth failed'
          });
        }

        if (result) {
          return res.status(200).send({
            status: 200,
            message: 'Auth successful'
          });
        }
      });

      return res.status(200).send({
        status: 200,
        user: user
      });
    } catch (error) {
      return res.status(401).send({
        status: 401,
        error: 'Enter valid email and password'
      });
    }
  }
};
var _default = User;
exports["default"] = _default;
//# sourceMappingURL=user_controller.js.map