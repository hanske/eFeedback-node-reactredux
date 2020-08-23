const express = require("express"); // CommonJS modules, import express from 'express' is using ES2015 currently not supported in Node
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
require("./models/User");
require("./services/passport"); // No need to declare variable since we don't actually need something from passport, user

mongoose.connect(keys.mongoURI);

// used to setup config to listen incoming request from node and route to handlers
const app = express();

// When using middleware with express before being handled by route handlers, we need to wire it up first by using app.use
app.use(bodyParser.json());

// Setup cookie for express
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: [keys.cookieKey],
  })
);

// Tell passport to make use of cookies to handle authentication
app.use(passport.initialize());
app.use(passport.session());

// Since we require authRoutes, billingRoutes it returns a function/exported, then call the function directly with app object
require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);

if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  // like our main.js file, or main.css file
  app.use(express.static("client/build"));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
