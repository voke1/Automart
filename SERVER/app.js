const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");

const app = express();
const carRoutes =  require("./routes/car_route");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(logger("dev"));


app.use(("/", carRoutes));

module.exports = app;








