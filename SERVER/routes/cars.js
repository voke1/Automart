const express = require("express");
const router = express.Router();

router.post("/car", (req, res, next) => {
    res.status(200).json({
        message: "Handling GET request to /car"
    })
});

router.get("/car/:carId", (req, res, next) => {
    const id = req.params.carId;

    res.status(200).json({

        status: 200,
        data: {
            id: id,
            email: 'String',
            created_on: 'DateTime',
            manufacturer: 'String',
            model: 'String',
            price: 'Float',
            body_type: 'String',
            status: "String",
        },

    })
});

module.exports = router;