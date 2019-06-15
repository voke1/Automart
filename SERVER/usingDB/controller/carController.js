import db from '../db';

const Car = {

    /**
   * Create A Car
   * @param {object} req 
   * @param {object} res
   * @returns {object} car object 
   */
  async create(req, res) {
    const text = `INSERT INTO
      cars(id, manufacturer, model, price, state, status, body_type, created_on, modified_date)
      VALUES($1, $2, $3, $4, $5, $6)
      returning *`;
    const values = [
      uuidv4(),
      req.body.manufacturer,
      req.body.model,
      req.body.price,
      req.body.state,
      req.body.status,
      req.body.body_type,
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

    /**
   * Get A Car
   * @param {object} req 
   * @param {object} res
   * @returns {object} car object
   */
  async getOne(req, res) {
    const text = 'SELECT * FROM cars WHERE id = $1';
    try {
      const { rows } = await db.query(text, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({'message': 'car not found'});
      }
      return res.status(200).send(rows[0]);
    } catch(error) {
      return res.status(400).send({status: 400, error})
    }
  },

    /**
   * Get All Car
   * @param {object} req 
   * @param {object} res 
   * @returns {object} cars array
   */
  async getAll(req, res) {
    const findAllQuery = 'SELECT * FROM cars';
    try {
      const { rows, rowCount } = await db.query(findAllQuery);
      return res.status(200).send({ rows, rowCount });
    } catch(error) {
      return res.status(400).send({status: 400, error});
    }
  },
 /*
   * Delete A Car
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return statuc code 204 
   */
  async delete(req, res) {
    const deleteQuery = 'DELETE FROM cars WHERE id=$1 returning *';
    try {
      const { deletedCar } = await db.query(deleteQuery, [req.params.id]);
      if(!deletedCar[0]) {
        return res.status(404).send({status: 404, error: 'no car to delete'});
      }
      return res.status(204).send({status: 204, message: "Car Ad successfully deleted" });
    } catch(error) {
      return res.status(400).send({status: 400, error});
    }
  }
}

export default Car;
