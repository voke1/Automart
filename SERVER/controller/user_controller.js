import UserModel from '../model/user_model';
import bcrypt from  "bcrypt";


const User = {
  /**
   * 
   * @param {object} req 
   * @param {object} res
   * @returns {object} user object 
   */
  create(req, res) {
    if (!req.body.password && !req.body.email && !req.body.firstname) {
      return res.status(400).send({'message': 'All fields are required'})
    }

    const user = UserModel.create(req.body);
    return res.status(201).send(user);
  },
  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @returns {object} Users array
   */
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
  getOne(req, res) {
    const user = UserModel.findOne(req.params.id);
    if (!user) {
      return res.status(404).send({'message': 'user not found'});
    }
    bcrypt.compare(req.body.password, UserModel.password, (error, result) => {
        if(error){
            return res.status(404).send({"message": "Auth failed"})
        }else{
            return res.status(200).send({" message": "Auth successful"})
        }
    })
    return res.status(200).send(user);
},


    const user = UserModel.create(req.body);
    return res.status(201).send(user);
  }
}

export default User;