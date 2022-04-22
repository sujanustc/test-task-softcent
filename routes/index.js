const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({
        status: true,
        message: "Welcome to Test Task!"
    });
});

router.get("/getBitcoinInfo", require("../controllers/bitCoin").getInfo);

module.exports = router;