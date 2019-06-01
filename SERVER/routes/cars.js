const express = require("express");
const router = express.Router();

router.post("/car", (req, res, next) => {
    res.status(200).json({
        message: "Handling GET request to /car"
    })
});

router.post("/car?status = available", (req, res, next) => {
    const id = req.params.carId;

    res.status(200).json({

        status: 200,
        data: [
            {
            id: id,
            created_on: 'DateTime',
            manufacturer: 'String',
            model: 'String',
            price: 'Float',
            state: 'String',
            status: "String",
            body_type: "string"
        },
        {
            id: id,
            created_on: 'DateTime',
            manufacturer: 'String',
            model: 'String',
            price: 'Float',
            state: 'String',
            status: "String",
            body_type: "string"
        }
    ]

    })
});

module.exports = router;

