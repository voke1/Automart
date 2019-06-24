"use strict";

var _express = _interopRequireDefault(require("express"));

var _userController = _interopRequireDefault(require("../usingDB/controller/userController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import User from '../usingDatastructure/controller/user_controller';
var router = _express["default"].Router(); // sign in user


router.post('/api/v1/auth/signin', _userController["default"].getOne); // sign up a user

router.post('/api/v1/auth/signup', _userController["default"].create);
module.exports = router;
//# sourceMappingURL=user_route.js.map