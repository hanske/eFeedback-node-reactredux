const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");

// when sending post request to express, it doest not parsed the request payload by default so it should be parsed first
// by installing body-parser module above express
module.exports = (app) => {
  // call requireLogin middleware once this route is triggered this is to check first if a user is logged in
  app.post("/api/stripe", requireLogin, async (req, res) => {
    // create the actual charge to stripe API
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "$5 for 5 credits",
      source: req.body.id,
    });

    // Add credit to currently logged in use, save to db then send response back of the updated user
    req.user.credits += 5;
    const user = await req.user.save();

    res.send(user);
  });
};
