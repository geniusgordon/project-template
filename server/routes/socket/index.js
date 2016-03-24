const logger = require('../../logger')('socket');

module.exports = function socketRouter(socket) {
  logger.info('socket client connected');
  socket.on('disconnect', () => {
    logger.info('socket client disconnected');
  });
};

