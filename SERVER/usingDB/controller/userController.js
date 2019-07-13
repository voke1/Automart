
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
import '@babel/polyfill';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import uuidv4 from 'uuid/v4';
import bcrypt from 'bcrypt';
import async from 'async';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import dotenv from 'dotenv';
import db from '../db';


dotenv.config();


const User = {

  /**
   * Create A User
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  async create(req, res) {
    const text = `INSERT INTO
      Users(id, token, email, first_name, last_name, password, is_admin, address, created_date, modified_date)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      returning *`;
    // handling no input value to sign up a user.
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({ status: 400, error: 'please fill in required fields' });
    }

    // eslint-disable-next-line no-unused-expressions
    // this.findUser;

    req.body.token = jwt.sign(req.body.email, process.env.TOKEN);
    const values = [
      uuidv4(),
      req.body.token,
      req.body.email,
      req.body.first_name,
      req.body.last_name,
      // eslint-disable-next-line no-unused-vars
      bcrypt.hashSync(req.body.password, 10, (error, hash) => {
        if (error) { return ({ message: 'error found' }); } return null;
      }) || '',
      req.body.is_admin,
      req.body.address,
      moment(new Date()),
      moment(new Date()),
    ];


    try {
      const { rows } = await db.query(text, values);
      const user = (rows[0]);
      return res.status(201).send({ status: 201, user });
    } catch (error) {
      return res.status(400).send({ status: 400, error });
    }
  },
  /**
       * //sign in a user
       * @param {object} req
       * @param {object} res
       * @returns {object} return user Object
       */
  async getOne(req, res) {
    const text = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await db.query(text, [req.body.email]);

      if (!rows[0]) {
        return res.status(404).send({ status: 404, error: `A user with the specified email: ${req.body.email} was not found` });
      }
      bcrypt.compare(req.body.password, rows[0].password, (error, result) => {
        if (result) {
          const data = rows[0];
          return res.status(200).send({ status: 200, data });
        }
        return res.status(401).send({ status: 401, error: 'Authentication information is invalid' });
      });
    } catch (error) {
      return res.status(401).send({ status: 401, error: 'Please enter valid email and password' });
    }
    return null;
  },
  // Reset Password
  async updatePassword(req, res) {
    async.waterfall([
      function (done) {
        crypto.randomBytes(20, (err, buf) => {
          const token = buf.toString('hex');
          done(err, token);
        });
      },
      async function (token, user) {
        const text = 'SELECT * FROM users WHERE email = $1';
        try {
          // req.body.email = req.params.useremail;
          const { rows } = await db.query(text, [req.body.email]);

          if (!rows[0]) {
            return res.status(404).send({ status: 404, error: 'No user account with the email already exist' });
          }
          user = rows[0];
        } catch (error) {
          return res.status(401).send({ error });
        }

        const smtpTransport = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: 'wisdomvoke@gmail.com',
            pass: process.env.GWP,
          },
        });
        const mailOptions = {
          to: user.email,
          from: 'vokeolomu01@gmail.com',
          subject: 'Password Reset',
          text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
            + `Please see below for your password: ${user.password}`
            + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
        };
        smtpTransport.sendMail(mailOptions, function () {
          console.log('mail sent');
          return res.status(404).send({ status: 404, info: `An email has been sent to ${user.email} containing your password` });
        });
        return null;
      },
    ]);
  },

};


export default User;
