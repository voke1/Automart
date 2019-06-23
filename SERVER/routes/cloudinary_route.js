import express from 'express';
import cloudinary from 'cloudinary';
import multipart from 'connect-multiparty';

const router = express.Router();
const multipartMiddleware = multipart();


// Enter credentials below
cloudinary.config({
  cloud_name: 'voke',
  api_key: '146586867451971',
  api_secret: 'ZKdVZgEc-NY7qUnL9jXNnRuZQWw',
});

router.post('/car/upload', multipartMiddleware, (req, res) => {
  const filename = req.files.dataFile.path;
  cloudinary.uploader.upload(filename, { tags: 'gotemps', resource_type: 'auto' })
    .then((file) => {
      console.log(file);
      res.redirect('./model/cloudinary_model');
    })
    .catch((err) => {
      if (err) {
        console.warn(err);
      }
      res.redirect('./model/cloudinary_model');
    });
});

module.exports = router;
