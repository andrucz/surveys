const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

const googleStrategyConfig = {
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback'
};

const persistUser = (accessToken, refreshToken, profile, done) => {
  User.findOne({ googleId: profile.id })
    .then(exisingUser => {
      if (!exisingUser) {
        const user = new User({
          googleId: profile.id
        });
        user.save();
      }
    });
};

const googleStrategy = new GoogleStrategy(googleStrategyConfig, persistUser);
passport.use(googleStrategy);
