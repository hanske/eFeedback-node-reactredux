const passport = require("passport"); // General helper for node js authentication
const GoogleStrategy = require("passport-google-oauth20").Strategy; // Helper for specific provider ie. Google
const FacebookStrategy = require("passport-facebook").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

// Create model class for collection 'user'
const User = mongoose.model("users");

// Seriliaze pulled user from db to be passed as cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deseriliaze user info, search it in db in the db then call done
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      // Callback after user is signed from google to our server
      // Create new instance of User, passing the properties we defined in mongoose and save it in mongoDB
      // If user exist in instance of db, skip creation of new user
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        // we already have a record with the given profile id then call done in order for passport to continue
        return done(null, existingUser);
      }
      // we don't have a record with the given profile id so create a new one, save it and wait for the promise then call done
      const user = await new User({
        googleId: profile.id,
        firstName: profile.name.givenName,
      }).save();
      done(null, user);
    }
  )
);

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: keys.facebookClientID,
//       clientSecret: keys.facebookClientSecret,
//       callbackURL: "/auth/facebook/callback",
//       profileFields: ["email", "name"],
//       proxy: true,
//     },
//     (accessToken, refreshToken, profile, done) => {
//       // Callback after user is signed from google to our server
//       // Create new instance of User, passing the properties we defined in mongoose and save it in mongoDB
//       // If user exist in instance of db, skip creation of new user
//       User.findOne({ facebookId: profile.id }).then((existingUser) => {
//         if (existingUser) {
//           // we already have a record with the given profile id then call done in order for passport to continue
//           done(null, existingUser);
//         } else {
//           // we don't have a record with the given profile id so create a new one, save it and wait for the promise then call done
//           new User({
//             facebookId: profile.id,
//             firstName: profile.name.givenName,
//           })
//             .save()
//             .then((user) => done(null, user));
//         }
//       });
//     }
//   )
// );
