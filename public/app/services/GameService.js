module.exports = /*@ngInject*/ function ($http, SocketService) {

  return {
    list: function () {
      return $http.get('/games');
    },
    richest: function () {
      return $http.get('/richest');
    }
  };

};