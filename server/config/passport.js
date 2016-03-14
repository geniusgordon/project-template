const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../models/user');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  UserModel.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use('local-signup', new LocalStrategy({
  passReqToCallback: true,
}, (req, username, password, done) => {
  process.nextTick(() => {
    UserModel.findOne({
      username,
    }, (findUserErr, user) => {
      if (findUserErr) {
        done(findUserErr);
        return;
      }
      if (user) {
        done(null, false, req.flash('signupMessage', 'That username is already taken.'));
        return;
      }
      const newUser = new UserModel();
      newUser.username = username;
      newUser.password = newUser.generateHash(password);
      newUser.save((saveUserErr) => {
        if (saveUserErr) {
          done(saveUserErr);
          return;
        }
        done(null, newUser);
      });
    });
  });
}));

passport.use('local-login', new LocalStrategy({
  passReqToCallback: true,
}, (req, username, password, done) => {
  UserModel.findOne({
    username,
  }, (findUserErr, user) => {
    if (findUserErr) {
      return done(findUserErr);
    }
    if (!user) {
      return done(null, false, req.flash('loginMessage', 'No user found.'));
    }
    if (!user.validPassword(password)) {
      return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
    }
    return done(null, user);
  });
}));

module.exports = passport;

