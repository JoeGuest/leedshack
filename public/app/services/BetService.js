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
    },
    yourbets: function () {
      return $http.get('/yourbets');
    },
    yourprebets: function () {
      return $http.get('/yourprebets');
    },
    allbets: function () {
      return $http.get('/allbets');
    },
    wins: function () {
      return $http.get('/wins');
    }
  };

};