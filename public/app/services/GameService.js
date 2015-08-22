module.exports = /*@ngInject*/ function ($http, SocketService) {

  return {
    list: function () {
      return $http.get('/games');
    },
    richest: function () {
      return $http.get('/richest');
    },
    getStats: function (id) {
      return $http.get('/statsforgame', {
        params: {id: id}
      });
    }
  };

};