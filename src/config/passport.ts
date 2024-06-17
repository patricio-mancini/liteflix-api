import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import UserModel from '../models/user';
import env from './env';

export default function(passport) {
  passport.use(new GoogleStrategy({
      clientID: env.googleClientID,
      clientSecret: env.googleClientSecret,
      callbackURL: env.googleCallbackURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await UserModel.findOne({ email: profile.emails[0].value });
        if (existingUser) {
          return done(null, existingUser);
        }
        const userData = {
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          photo: profile.photos[0].value
        };
        const newUser = new UserModel(userData);
        await newUser.save();
        done(null, newUser);
      } catch (error) {
        done(error, null);
      }
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await UserModel.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
};