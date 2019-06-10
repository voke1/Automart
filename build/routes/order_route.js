"use strict";

var _order_controller = _interopRequireDefault(require("../controller/order_controller"));

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); //post order


router.post('/api/v1/order', _order_controller["default"].create); //update price of posted order

router.patch('/api/v1/order/:orderId/price', _order_controller["default"].getUpdateOrderPrice);
module.exports = router;
//# sourceMappingURL=order_route.js.map