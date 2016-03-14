const express = require('express');
const passport = require('../config/passport');

const router = new express.Router();

router.get('/login', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/');
  } else {
    res.render('login.ejs', {
      message: req.flash('loginMessage'),
    });
  }
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
}));

router.get('/signup', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/');
  } else {
    res.render('signup.ejs', {
      message: req.flash('signupMessage'),
    });
  }
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/signup',
  failureFlash: true,
}));

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;

