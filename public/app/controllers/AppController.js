module.exports = /*@ngInject*/ function ($scope, SocketService, BetService, GameService) {
  
  SocketService.on('test', function (msg) {
    console.log(msg);
  });
  
  GameService.list().success(function (games) {
    $scope.games = games;
  });
  
  $scope.submit = function () {
    BetService.create({
      game_id: '',
      coins: 0,
      bet: '',
      range: {
        min: 0,
        max: 0
      },
      complete_time: 0
    }).success(function () {
      $scope.message = 'BET SUBMITTED THANKS';
    });
  };
  
};