const User = require('../models/user');

module.exports = {
  all() {
    return User.find({});
  },
};

