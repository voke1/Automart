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

var Template =
/*#__PURE__*/
function () {
  /**
   * class constructor
   * @param {object} data
   */
  function Template() {
    _classCallCheck(this, Template);

    this.templates = [];
  }
  /**
   * 
   * @returns {object} car object
   */


  _createClass(Template, [{
    key: "create",
    value: function create(data) {
      var newTemplate = {
        status: 200,
        data: {
          id: _uuid["default"].v4(),
          manufacturer: data.manufacturer || '',
          model: data.model || '',
          price: data.price || '',
          status: data.status || '',
          dataFile: String,
          body_type: data.body_type || '',
          createdDate: _moment["default"].now(),
          modifiedDate: _moment["default"].now()
        }
      };
      this.cars.push(newTemplate);
      return newTemplate;
    }
    /**
     * @returns {object} returns all cars
     */

  }, {
    key: "findAll",
    value: function findAll() {
      return this.cars;
    }
  }]);

  return Template;
}();

var _default = new Template();

exports["default"] = _default;
//# sourceMappingURL=cloudinary_model.js.map