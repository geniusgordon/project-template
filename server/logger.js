const fs = require('fs');
const winston = require('winston');

if (!fs.existsSync('./logs')) {
  fs.mkdirSync('./logs');
}

module.exports = function createLogger(name) {
  const logger = new winston.Logger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({
        filename: `logs/${name}.log`,
      }),
    ],
  });

  if (process.env.NODE_ENV === 'test') {
    logger.remove(winston.transports.Console);
  }

  return logger;
};

