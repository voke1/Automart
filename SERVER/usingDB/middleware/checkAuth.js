import jwt from 'jsonwebtoken';

// Authentication middleware; check for token
module.exports = (req, res, next) => {
  try {
    const auth = req.headers.token;
    const decode = jwt.verify(auth, process.env.TOKEN);
    req.userData = decode;
    next();
  } catch (error) {
    return res.status(401).send({ status: 401, error: 'Authentication failed' });
  }
  return null;
};
