"use strict";

var _express = _interopRequireDefault(require("express"));

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _connectMultiparty = _interopRequireDefault(require("connect-multiparty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

var multipartMiddleware = (0, _connectMultiparty["default"])(); // Enter credentials below

_cloudinary["default"].config({
  cloud_name: 'voke',
  api_key: '146586867451971',
  api_secret: 'ZKdVZgEc-NY7qUnL9jXNnRuZQWw'
});

router.post('/car/upload', multipartMiddleware, function (req, res) {
  var filename = req.files.dataFile.path;

  _cloudinary["default"].uploader.upload(filename, {
    tags: 'gotemps',
    resource_type: 'auto'
  }).then(function (file) {
    console.log(file);
    res.redirect('./model/cloudinary_model');
  })["catch"](function (err) {
    if (err) {
      console.warn(err);
    }

    res.redirect('./model/cloudinary_model');
  });
});
module.exports = router;
//# sourceMappingURL=cloudinary_route.js.map