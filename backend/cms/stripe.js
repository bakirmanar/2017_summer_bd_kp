
var config = require("./config");
var stripe = require("stripe")(config.stripeKeySecret);

module.exports = function (app) {

    app.get("/charge", function (req, res) {
        res.render("index.pug", {keyPublishable: config.stripeKeyPublishable});
    });

    app.post("/charge", function (req, res) {
        var amount = 500;

        stripe.customers.create({
            email: req.body.stripeEmail,
            source: req.body.stripeToken
        }).then(function (customer) {
            stripe.charges.create({
                amount: amount,
                description: "Sample Charge",
                currency: "usd",
                customer: customer.id
            }).then(function (charge) {


                res.render("charge.pug")
            })
        });
    });

};

