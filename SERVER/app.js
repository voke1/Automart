
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");

const app = express();
const carRoutes =  require ("./routes/car_route");
const userRoutes =  require("./routes/user_route");

const orderRoutes =  require("./routes/order_route");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(logger("dev"));


app.use(('/', userRoutes));
app.use('/', carRoutes);
app.use('/', orderRoutes);

module.exports = app;








