"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _flag_model = _interopRequireDefault(require("../model/flag_model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Flag = {
  /**
   * 
   * @param {object} req 
   * @param {object} res
   * @returns {object} flag object 
   */
  create: function create(req, res) {
    if (!req.body.reason && !req.body.description) {
      return res.status(400).send({
        status: 400,
        error: 'All fields are required'
      });
    }

    var report = _flag_model["default"].create(req.body);

    return res.status(201).send({
      status: 201,
      report: report
    });
  },

  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @returns {object} flag array
   */
  getAll: function getAll(req, res) {
    var flags = _flag_model["default"].findAll();

    return res.status(200).send({
      status: 200,
      flags: flags
    });
  }
};
var _default = Flag;
exports["default"] = _default;
//# sourceMappingURL=flag_controller.js.map