"use strict";

var _user_controller = _interopRequireDefault(require("../controller/user_controller"));

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); //sign in user


router.post('/api/v1/auth/signin', _user_controller["default"].getOne); //sign up a user

router.post('/api/v1/auth/signup', _user_controller["default"].create);
module.exports = router;
//# sourceMappingURL=user_route.js.map