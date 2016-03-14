function getDatabaseUrl() {
  if (process.env.NODE_ENV === 'test') {
    return 'mongodb://localhost/NAMETest';
  }
  return 'mongodb://localhost/NAMEDev';
}

module.exports = {
  url: getDatabaseUrl(),
};

