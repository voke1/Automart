
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");

const app = express();
const flagRoutes =  require("./routes/flag_route");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(logger("dev"));


app.use(("/", flagRoutes));

module.exports = app;








