import cloudinary from 'cloudinary';
import multipart from 'connect-multiparty';

module.exports = (req, res, next) => {
  try {
    cloudinary.config({
      cloud_name: 'voke',
      api_key: '146586867451971',
      api_secret: 'ZKdVZgEc-NY7qUnL9jXNnRuZQWw',
    });


    multipart();

    const filename = req.files.dataFile.path;
    cloudinary.uploader.upload(filename, { tags: 'gotemps', resource_type: 'auto' });

    next();
  } catch (error) {
    return res.status(401).send({ status: 401, error: 'Please attach image' });
  }
};
