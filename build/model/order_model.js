"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _uuid = _interopRequireDefault(require("uuid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Order =
/*#__PURE__*/
function () {
  /**
   * class constructor
   * @param {object} data
   */
  function Order() {
    _classCallCheck(this, Order);

    this.orders = [];
  }
  /**
   *
   * @returns {object} car object
   */
  //create order


  _createClass(Order, [{
    key: "create",
    value: function create(data) {
      var newOrder = {
        status: 200,
        data: {
          id: _uuid["default"].v4(),
          car_id: data.car_id || '',
          status: data.status || '',
          price_offered: data.price_offered,
          price: data.price,
          modifiedDate: _moment["default"].now()
        }
      }; //push order to orders array

      this.orders.push(newOrder);
      return newOrder;
    }
    /**
    *
    * @param {uuid} id
    * @returns {object} order object
    */
    //find a single order

  }, {
    key: "findOne",
    value: function findOne(id) {
      try {
        for (var i = 0; i < this.orders.length; i++) {
          if (this.orders[i].data.id === id) {
            return this.orders[i];
          }
        }
      } catch (error) {
        return null;
      }
    }
    /**
     *
     * @param {uuid} id
     * @param {object} data
     */
    //Update price of order still pending

  }, {
    key: "updateOrderPrice",
    value: function updateOrderPrice(id, newPriceOffered) {
      var order = this.findOne(id);
      var index = this.orders.indexOf(order);

      if (this.orders[index].data.status === 'pending') {
        this.orders[index].data.old_price_offered = this.orders[index].data.price_offered;
        this.orders[index].data.new_price_offered = newPriceOffered;
        this.orders[index].data.modifiedDate = _moment["default"].now();
        return this.orders[index];
      }

      throw new Error();
    }
  }]);

  return Order;
}();

var _default = new Order();

exports["default"] = _default;
//# sourceMappingURL=order_model.js.map