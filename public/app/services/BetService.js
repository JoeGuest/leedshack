module.exports = /*@ngInject*/ function ($http) {

  return {
    create: function (bet) {
      return $http.post('/bet', bet);
    },
    current: function () {
      return $http.get('/bet/me');
    },
    friends: function () {
      return $http.get('/bet/friends');
    },
    popular: function () {
      return $http.get('/bet/popular');
    },
    coins: function () {
      return $http.get('/coins');
    }
  };

};