
const express = require("express");
const router = express.Router();

router.get("/order", (req, res, next) => {
    res.status(200).json({
        message: "Handling GET request to /car"
    })
});

router.patch("/order/:orderId", (req, res, next) => {
    const id = req.params.orderId;

    res.status(200).json({

        status : "Integer",
        data :
    {
        id : "Integer",
        car_id : "Integer",
        status : "String",
        old_price_offered : "Float",
        new_price_offered : "Float" ,
        },

    })
});

module.exports = router;
