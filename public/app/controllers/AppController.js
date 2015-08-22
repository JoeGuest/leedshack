module.exports = /*@ngInject*/ function ($scope, SocketService, BetService, GameService) {
  
  SocketService.on('test', function (msg) {
    console.log(msg);
  });
  
  function bet() {
    return {
      game: null,
      coins: null,
      bet: null,
      range: null,
      complete_time: null
    };
  }
  
  $scope.bet = bet();
  
  GameService.list().success(function (games) {
    $scope.games = games;
  });
  
  $scope.submit = function () {
    BetService.create($scope.bet).success(function () {
      $scope.message = 'BET SUBMITTED THANKS';
      $scope.bet = bet();
    });
  };
  
};