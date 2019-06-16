import db from '../db';

const User = {

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
        return res.status(404).send({status: 404, error: 'user not found'});
      }
      return res.status(200).send(user[0]);
    } catch(error) {
      return res.status(401).send({status: 401,  error: 'Enter valid email and password' })
    }
  },

}

export default User;
