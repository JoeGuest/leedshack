var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'leedshack'
    },
    port: 3000,
    redis: {
      host: 'localhost',
      port: 6379,
      prefix: 'dev:'
    },
    sessionSecret: 'asdadasgawae1314',
    db: {db: 'leedshack_development'}
  },

  test: {
    root: rootPath,
    app: {
      name: 'leedshack'
    },
    port: 3000,
    db: {db: 'leedshack_test'}
  },

  production: {
    root: rootPath,
    app: {
      name: 'leedshack'
    },
    port: 3000,
    db: {db: 'leedshack_production'}
  }
};

module.exports = config[env];
