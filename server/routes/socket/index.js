module.exports = function socketRouter(io) {
  io.on('connection', (socket) => {
    io.log('info', 'socket client connected');

    socket.on('disconnect', () => {
      io.log('info', 'socket client disconnected');
    });
  });
};

