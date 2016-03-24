const express = require('express');
const userController = require('../../controllers/user');

const router = new express.Router();

router.get('/', (req, res) => {
  userController.all().then((users) => {
    res.status(200).json(users);
  }).then((err) => {
    res.status(500).json(err);
  });
});

module.exports = router;

