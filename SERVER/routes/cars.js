const express = require("express");
const router = express.Router();

router.post("/car", (req, res, next) => {
    res.status(200).json({
        message: "Handling GET request to /car"
    })
});

router.patch("/car/:carId/status", (req, res, next) => {
    const id = req.params.carId;

    res.status(200).json({

        status : "Integer",
        data : {
            id : "Integer",
            email : "String",
            created_on : "DateTime",
            manufacturer : "String",
            model : "String",
            price : "Float",
            state : "String",
            status : "String",
        },

    })
});

module.exports = router;

