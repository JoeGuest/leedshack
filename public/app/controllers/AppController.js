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
  
  GameService.richest().success(function (users) {
    $scope.richest = users;
  });
  
  BetService.coins().success(function (coins) {
    $scope.coins = coins;
  });
  
  $scope.submit = function () {
    BetService.create($scope.bet).success(function (data) {
      $scope.coins = data;
      $scope.message = 'bet placed!';
      $scope.bet = bet();
    });
  };
  
  $scope.coinChange = function () {
    if($scope.coins - $scope.bet.coins  < 0) {
      $scope.bet.coins = $scope.coins;
    }
  };
  
  $scope.changeGame = function () {
    GameService.getStats($scope.bet.game.id).success(function (stats) {
      $scope.num_players = stats[0].num_players;
    });
  };
  
};