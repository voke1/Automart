const express = require("express");
const router = express.Router();

router.post("/car", (req, res, next) => {
    res.status(200).json({
        message: "Handling GET request to /car"
    })
});

router.delete("/car/:carId", (req, res, next) => {
    const id = req.params.carId;

    res.status(200).json({

        status: 200,
        data: "Car Ad successfully deleted"
        

    })
});

module.exports = router;

