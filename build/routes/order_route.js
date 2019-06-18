"use strict";

var _orderController = _interopRequireDefault(require("../usingDB/controller/orderController"));

var _express = _interopRequireDefault(require("express"));

var _checkAuth = _interopRequireDefault(require("../usingDB/middleware/checkAuth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//import Order from '../usingDatastructure/controller/order_controller';
var router = _express["default"].Router(); //post order


router.post('/api/v1/order', _checkAuth["default"], _orderController["default"].create); //update price of posted order

router.patch('/api/v1/order/:orderId/price', _checkAuth["default"], _orderController["default"].getUpdateOrderPrice);
module.exports = router;
//# sourceMappingURL=order_route.js.map