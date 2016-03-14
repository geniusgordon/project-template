const express = require('express');
const User = require('../../models/user');

const router = new express.Router();

router.get('/', (req, res) => {
  User.find({}, (err, users) => {
    res.status(200).json(users);
  });
});

module.exports = router;

