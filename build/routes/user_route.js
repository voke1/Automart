"use strict";

var _express = _interopRequireDefault(require("express"));

var _userController = _interopRequireDefault(require("../usingDB/controller/userController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // sign in user


router.post('/api/v1/auth/signin', _userController["default"].getOne); // sign up a user

router.post('/api/v1/auth/signup', _userController["default"].create); // get all users including admin

router.get('/api/v1/user', _userController["default"].getAll); // delete user (admin only)

router["delete"]('/api/v1/users/:userId', _userController["default"]["delete"]); // route to reset password

router.post('/api/v1/users/:useremail/reset_password', _userController["default"].updatePassword);
module.exports = router;
//# sourceMappingURL=user_route.js.map