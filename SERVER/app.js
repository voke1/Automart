
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");

const app = express();
const cloudinaryRoutes =  require("./routes/cloudinary_route");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(logger("dev"));


app.use(("/car/upload", cloudinaryRoutes));

module.exports = app;








