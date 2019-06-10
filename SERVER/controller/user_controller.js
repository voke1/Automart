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
      return res.status(201).send(user);
    } catch (error) {
      return res.status(400).send({ message: 'email and password are required' });
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
    return res.status(200).send(users);
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
      return res.status(404).send({ message: 'user not found' });
    }
    try {
      bcrypt.compare(req.body.password, UserModel.password, (error, result) => {
        if (error) {
          return res.status(401).send({ message: 'Auth failed' });
        } if (result) {
          return res.status(200).send({ ' message': 'Auth successful' });
        }
      });

      return res.status(200).send(user);
    } catch (error) {
      return res.status(401).send({ message: 'Enter valid email and password' });
    }
  },

};

export default User;
