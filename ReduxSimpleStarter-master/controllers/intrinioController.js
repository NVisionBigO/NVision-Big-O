var https = require("https");

const intrinioController = {

    getData: (req, res) => {

        var username = "9766520dc4687a6ff01c89ccde676fbb";
        var password = "6d34ddc4532d4a77a130e01688d4b43f";
        var auth = "Basic " + new Buffer(username + ':' + password).toString('base64');

        var request = https.request({
            method: "GET",
            host: "api.intrinio.com",
            path: `/prices?ticker=${req.params.ticker}`,
            headers: {
                "Authorization": auth
            }
        }, function (response) {
            var json = "";
            response.on('data', function (chunk) {
                json += chunk;
            });
            response.on('end', function () {
                var company = JSON.parse(json);
                res.send(company);
            });
        });

        request.end();
    }
};


module.exports = intrinioController;