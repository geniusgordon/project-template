module.exports = function socketConfig(io, store) {
  const cookieParser = require('cookie-parser');
  const passportSocketIo = require('passport.socketio');

  function onAuthorizeSuccess(data, accept) {
    accept();
  }

  function onAuthorizeFail(data, message, error, accept) {
    if (error) {
      throw new Error(message);
    }
    if (error) {
      accept(new Error(message));
    }
  }

  io.use(passportSocketIo.authorize({
    store,
    cookieParser,
    secret: 'NAME-secret',
    success: onAuthorizeSuccess,
    fail: onAuthorizeFail,
  }));

  return io;
};

