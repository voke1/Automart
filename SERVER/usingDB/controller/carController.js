import db from '../db';

const Car = {

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
