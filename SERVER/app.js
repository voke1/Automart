
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");

const app = express();
const userRoutes =  require("./routes/user_route");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(logger("dev"));


app.use(("/signup", userRoutes));

module.exports = app;








