const passport = require("passport");

module.exports = (app) => {
  // route handler for users signing in and pass to passport
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  // route hander to take users request from google (code) then request user info from google using the code received
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/surveys");
    }
  );

  //////////////////////////-----FACEBOOK Routing-----/////////////////////////////////////////////////////////
  //   app.get(
  //     "/auth/facebook",
  //     passport.authenticate("facebook", {
  //       scope: ["email"],
  //     })
  //   );

  // route hander to take users request from facebook then request user info from facebook using the code received
  //   app.get(
  //     "/auth/facebook/callback",
  //     passport.authenticate("facebook", {
  //       successRedirect: "/",
  //       failureRedirect: "/login",
  //     })
  //   );

  // get to know the user logged in
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });

  // logout user
  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });
};
