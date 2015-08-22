module.exports = name = 'steambet.services';

angular.module(name, [])
  .factory('SocketService', require('./SocketService'))
  .factory('BetService', require('./BetService'))
  .factory('GameService', require('./GameService'));