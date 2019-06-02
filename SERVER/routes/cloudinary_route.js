const express = require("express");
const router = express.Router();
var cloudinary = require ("cloudinary"); 
var multipart = require ("connect-multiparty");
var multipartMiddleware = multipart();

var Template = require("../model/cloudinary_model");


//Enter credentials below                                              
cloudinary.config({
    cloud_name: "voke",
    api_key: "146586867451971",
    api_secret: "ZKdVZgEc-NY7qUnL9jXNnRuZQWw"
});

router.post("/car/upload", multipartMiddleware, function (req, res) {
    let filename = req.files.dataFile.path;
    cloudinary.uploader.upload(filename, { tags: "gotemps", resource_type: "auto" })
        .then(function (file) {
            console.log("Public id of the file is  " + file.public_id);
            console.log("Url of the file is  " + file.url);
           // template.dataFile = file.url;  //save the url to your model 
           // template.save()
            res.redirect("./model/cloudinary_model")
        })
        .catch(function (err) {
            if (err) {
                console.warn(err);
            }
            res.redirect("./model/cloudinary_model");
        })
    })

module.exports = router;