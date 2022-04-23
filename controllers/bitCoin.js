const axios = require('axios');
const moment = require('moment');

module.exports.getInfo = async (req, res) => {
    try {
        //Getting Params Data and Validate Customly
        const currency = req.query.currency
        if (!currency) return res.status(400).json({ status: false, error: "Missing Fields!" });

        //Fixed URLs
        const url1 = "https://api.coindesk.com/v1/bpi/currentprice/" + currency + ".json";
        const url2 = "https://api.coindesk.com/v1/bpi/historical/close.json";

        //Hit URLs with Params
        const res1 = await axios.get(url1);
        const res2 = await axios.get(url2, {
            params: {
                start: moment().subtract(30, 'days').format("YYYY-MM-DD"),
                end: moment().format("YYYY-MM-DD"),
                currency: currency
            }
        });

        //Sort for Maximum and Minimum Rate
        let sorted = Object.entries(res2.data.bpi).sort((prev, next) => prev[1] - next[1]);
        let min = sorted.shift();
        let max = sorted.pop();

        //Return Response
        return res.json({
            status: true,
            "Current Coin Rate": res1.data.bpi[currency.toUpperCase()].rate_float,
            "Minimum Rate in Last 30 Days": {
                date: min[0],
                rate: min[1]
            },
            "Maximum Rate in Last 30 Days": {
                date: max[0],
                rate: max[1]
            },
            disclaimer: "BPI value data returned as " + currency.toUpperCase(),
        });
    } catch (err) {
        return res.status(404).json({
            status: false,
            error: "Hit endpoint with a valid Currency Code."
        });
    }
};