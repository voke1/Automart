"use strict";

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Authentication middleware; check for token
module.exports = function (req, res, next) {
  try {
    var auth = req.headers.token;

    var decode = _jsonwebtoken["default"].verify(auth, process.env.TOKEN);

    req.userData = decode;
    next();
  } catch (error) {
    return res.status(401).send({
      status: 401,
      error: 'Authentication failed'
    });
  }

  return null;
};
//# sourceMappingURL=checkAuth.js.map