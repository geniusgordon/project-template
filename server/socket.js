const logger = require('./logger')('socket');

module.exports = function createSocket(store) {
  const _io = require('socket.io')();
  const io = {
    io: require('./config/socket')(_io, store),
    listen(server) {
      io.io.listen(server);
    },
    on(e, fn) {
      io.io.on(e, fn);
    },
    log(level, tag, message) {
      if (message) {
        logger.log(level, `[${tag}]: message`);
      } else {
        logger.log(level, tag);
      }
    },
  };

  return io;
};

