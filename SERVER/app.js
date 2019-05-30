import express from "express";
import logger from "morgan";
import bodyParser from "body-parser";
import { parse } from "querystring";

//set up the express app

const app = express;
const port =  parseInt(process.env.PORT, 10 || 3000);

//log request to console.
app.request(logger("dev"));

//Parse incoming request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//setup default cache-all route 

app.get("", (req, res) => res.status(200).send({
    message: "Welcome to Automart"
}));

//start the express server
app.listen(port, () => console.log(`server running on port ${port}`));