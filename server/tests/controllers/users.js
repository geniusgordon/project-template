const expect = require('expect');
const mongoose = require('mongoose');
const dbConfig = require('../../config/database');
const userController = require('../../controllers/user');

describe('user controller', () => {
  beforeEach((done) => {
    if (mongoose.connection.db) return done();
    mongoose.connect(dbConfig.url, done);
  });

  it('should get all users', (done) => {
    userController.all().then((users) => {
      expect(users).toExist();
      done();
    }).catch((err) => {
      expect(err).toNotExist();
      done();
    });
  });
});


