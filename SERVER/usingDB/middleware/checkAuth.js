import jwt from 'jsonwebtoken';

module.exports = (req, res, next) => {
  try {
    const token = req.body.authorization;
    //const token = req.headers.authorization;
    const decode = jwt.verify(token, process.env.TOKEN);
    req.userData = decode;
    next();
  } catch (error) {
    return res.status(401).send({ status: 401, error: 'Authentication failed' });
  }
  return null;
};
