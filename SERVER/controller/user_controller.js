import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../model/user_model';

require('dotenv').config();


const User = {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  //sign up a single user
  create(req, res) {
    try {
      req.body.token = jwt.sign(req.body.email, process.env.TOKEN);

      const user = UserModel.default.create(req.body);
      return res.status(201).send({status: 201, user});
    } catch (error) {
      return res.status(400).send({status: 400,  error: 'email and password are required' });
    }
  },
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} Users array
   */
  //get all users
  getAll(req, res) {
    const users = UserModel.findAll();
    return res.status(200).send({status: 200, users});
  },
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  //sign in a specific user
  getOne(req, res) {
    const user = UserModel.default.findOne(req.body.email);

    if (!user) {
      return res.status(404).send({ status: 404, error: 'user not found' });
    }
    try {
      bcrypt.compare(req.body.password, UserModel.password, (error, result) => {
        if (error) {
          return res.status(401).send({ status: 401, message: 'Auth failed' });
        } if (result) {
          return res.status(200).send({status: 200,  message: 'Auth successful' });
        }
      });

      return res.status(200).send({status: 200, user});
    } catch (error) {
      return res.status(401).send({status: 401,  error: 'Enter valid email and password' });
    }
  },

};

export default User;
