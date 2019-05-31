const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");


const app = express();

app.use(logger("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use((req, res, next) => {
    res.status(200).json({
        message: "Welcome to Automart, an online marketplace for automobile"
    });
})

app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})
module.exports = app;