module.exports = name = 'steambet.services';

angular.module(name, [])
  .factory('SocketService', require('./SocketService'));