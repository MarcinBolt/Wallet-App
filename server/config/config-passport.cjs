const passport = require("passport");
const passportJWT = require("passport-jwt");
require("dotenv").config();

const secretKey = process.env.SECRET;
const User = require("../service/schema/user.cjs");

const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const JWTparams = {
  secretOrKey: secretKey,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(JWTparams, (payload, done) => {
    User.find({ _id: payload.id })
      .then(([user]) => {
        if (!user) {
          return done(new Error("User not found"));
        }
        return done(null, user);
      })
      .catch((error) => done(error));
  })
);
