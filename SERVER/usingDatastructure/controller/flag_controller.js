import FlagModel from '../model/flag_model';

const Flag = {
  /**
   * 
   * @param {object} req 
   * @param {object} res
   * @returns {object} flag object 
   */
  create(req, res) {
    if (!req.body.reason && !req.body.description) {
      return res.status(400).send({status: 400, error: 'All fields are required'})
    }
    const report = FlagModel.create(req.body);
    return res.status(201).send({status: 201, report});
  },
  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @returns {object} flag array
   */
  getAll(req, res) {
    const flags = FlagModel.findAll();
    return res.status(200).send({status: 200, flags});
  }
}

export default Flag;