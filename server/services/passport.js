const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user));
});

const googleStrategyConfig = {
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback'
};

const persistUser = (accessToken, refreshToken, profile, done) => {
  User.findOne({ googleId: profile.id })
    .then(existingUser => {
      if (existingUser) {
        done(null, existingUser);
      } else {
        new User({ googleId: profile.id })
          .save()
          .then(user => done(null, user));
      }
    });
};

const googleStrategy = new GoogleStrategy(googleStrategyConfig, persistUser);
passport.use(googleStrategy);
