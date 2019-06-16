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
    } catch(error) {
      return res.status(400).send({status: 400, error});
    }
  },

}

export default User;
