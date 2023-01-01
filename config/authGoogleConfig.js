const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User } = require("../models/User");
const _ = require("lodash");

const Strategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/google/callback",
  },
  async (accessToken, refreshToken, profile, cb) => {
    // console.log(profile);
    let user = await User.findOne({
      googleId: profile.id,
      email: profile._json.email,
    });

    if (user) {
      let token = user.generateJwt();
      let response = {
        data: _.pick(user, ["email", "_id"]),
        token: token,
      };
      cb(null, response);
    } else {
      user = new User({ googleId: profile.id, email: profile._json.email });
      await user.save();

      let token = user.generateJwt();
      let response = {
        data: _.pick(user, ["email", "_id"]),
        token: token,
      };
      cb(null, response);
    }
  }
);

passport.use(Strategy);
