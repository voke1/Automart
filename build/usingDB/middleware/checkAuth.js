"use strict";

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

module.exports = function (req, res, next) {
  try {
    var token = req.headers.authorization;

    var decode = _jsonwebtoken["default"].verify(token, process.env.TOKEN);

    req.userData = decode;
    next();
  } catch (error) {
    return res.status(401).send({
      status: 401,
      error: 'Authentication failed'
    });
  }

  ;
};
//# sourceMappingURL=checkAuth.js.map