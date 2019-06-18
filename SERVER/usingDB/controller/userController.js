import "@babel/polyfill";
import db from '../db';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import uuidv4 from 'uuid/v4';
import bcrypt from 'bcrypt';

const User = {

    /**
   * Create A User
   * @param {object} req 
   * @param {object} res
   * @returns {object} user object 
   */
    async create(req, res) {
        const text = `INSERT INTO
      Users(id, token, email, firstname, lastname, password, is_admin, created_date, modified_date)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
      returning *`;
        req.body.token = jwt.sign(req.body.email, process.env.TOKEN);
        const values = [
            uuidv4(),
            req.body.token,
            req.body.email,
            req.body.firstname,
            req.body.lastname,
            bcrypt.hashSync(req.body.password, 10, (error, hash) => {
                if (error) {
                    return ({ message: 'error found' });
                }
            }) || '',
            req.body.is_admin,
            moment(new Date()),
            moment(new Date())
        ];
         try {
            const { rows } = await db.query(text, values);
            const user = (rows[0]);
            return res.status(201).send({status: 201, user});
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
                return res.status(404).send({ status: 404, error: 'user not found' });
            }
            bcrypt.compare(req.body.password, rows[0].password, (error, result) => {
                if (error) {
                    return res.status(401).send({ status: 401, message: 'Auth failed' });
                } if (result) {
                    const signedUser = rows[0];
                    return res.status(200).send({status: 200, signedUser});
                }
            });

        } catch (error) {
            return res.status(401).send({ status: 401, error: 'Enter valid email and password' })
        }
    },
}

export default User;
