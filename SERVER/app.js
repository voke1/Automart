const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");

const app = express();
const orderRoutes =  require("./routes/order");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(logger("dev"));


app.use(("/order", orderRoutes));

module.exports = app;