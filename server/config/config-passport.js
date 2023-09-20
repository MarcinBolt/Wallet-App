import passport from 'passport';
import PassportJwt from 'passport-jwt';
import * as dotenv from 'dotenv';
import User from '../service/schema/user.js';

dotenv.config();
const secretKey = process.env.SECRET;

const ExtractJWT = PassportJwt.ExtractJwt;
const Strategy = PassportJwt.Strategy;
const JWTparams = {
  secretOrKey: secretKey,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(JWTparams, (payload, done) => {
    User.find({ _id: payload.id })
      .then(([user]) => {
        if (!user) {
          return done(new Error('User not found'));
        }
        return done(null, user);
      })
      .catch(error => done(error));
  }),
);
