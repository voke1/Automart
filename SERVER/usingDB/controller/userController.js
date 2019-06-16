import db from '../db';

const User = {

    /**
   * Create A User
   * @param {object} req 
   * @param {object} res
   * @returns {object} user object 
   */
    async create(req, res) {
        const text = `INSERT INTO
      Users(id, token, email, firstname, lastname, password, isAdmin, created_on, modified_date)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
      returning *`;
        const values = [
            uuidv4(),
            req.body.token,
            req.body.email,
            req.body.firstname,
            req.body.lastname,
            req.body.status,
            req.body.password,
            req.body.isAdmin,
            moment(new Date()),
            moment(new Date())
        ];
        try {
            const { rows } = await db.query(text, values);
            return res.status(201).send(rows[0]);
        } catch (error) {
            return res.status(400).send({ status: 400, error });
        }
    },
    /**
       * //sign in a user
       * @param {object} req 
       * @param {object} res
       * @returns {object} user object
       */
    async getOne(req, res) {
        const text = 'SELECT * FROM users WHERE id = $1';
        try {
            const { user } = await db.query(text, [req.params.email]);
            if (!user[0]) {
                return res.status(404).send({ status: 404, error: 'user not found' });
            }
            return res.status(200).send(user[0]);
        } catch (error) {
            return res.status(401).send({ status: 401, error: 'Enter valid email and password' })
        }
    },

}

export default User;
