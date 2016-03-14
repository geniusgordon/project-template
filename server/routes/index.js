const express = require('express');
const authenticate = require('./authenticate');
const api = require('./api');

const router = new express.Router();

router.use(authenticate);
router.use('/api', api);
router.get('/', (req, res) => {
  if (!req.isAuthenticated()) {
    res.render('index', {
      title: 'Express',
      message: 'You are not Logged in.',
      user: false,
    });
    return;
  }
  res.render('index', {
    title: 'Express',
    message: `Hi, ${req.user.username}.`,
    user: req.user,
  });
});

module.exports = router;

