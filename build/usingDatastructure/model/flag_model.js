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

var Flag =
/*#__PURE__*/
function () {
  /**
   * class constructor
   * @param {object} data
   */
  function Flag() {
    _classCallCheck(this, Flag);

    this.flags = [];
  }
  /**
   * 
   * @returns {object} flag object
   */


  _createClass(Flag, [{
    key: "create",
    value: function create(data) {
      var newFlag = {
        id: _uuid["default"].v4(),
        carId: data.carId,
        reason: data.reason || '',
        description: data.description || '',
        state: data.state || '',
        createdDate: _moment["default"].now(),
        modifiedDate: _moment["default"].now()
      };
      this.flags.push(newFlag);
      return newFlag;
    }
    /**
     * @returns {object} returns all flags
     */

  }, {
    key: "findAll",
    value: function findAll() {
      return this.flags;
    }
  }]);

  return Flag;
}();

var _default = new Flag();

exports["default"] = _default;
//# sourceMappingURL=flag_model.js.map