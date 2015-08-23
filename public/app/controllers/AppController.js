module.exports = /*@ngInject*/ function ($scope, SocketService, BetService, GameService, $interval) {
  
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
  
  function richest() {
    GameService.richest().success(function (users) {
      $scope.richest = users;
    });
  }
  richest();
  $interval(richest, 5000);
  
  function coins() {
    BetService.coins().success(function (coins) {
      $scope.coins = coins;
    });
  }
  coins();
  $interval(coins, 5000);
  
  function yourbets() {
    BetService.yourbets().success(function (bets) {
      $scope.yourbets = bets;
    });
  }
  yourbets();
  $interval(yourbets, 5000);
  
  function yourprebets() {
    BetService.yourprebets().success(function (bets) {
      $scope.yourprebets = bets;
    });
  }
  yourprebets();
  $interval(yourprebets, 5000);
  
  function allbets() {
    BetService.allbets().success(function (bets) {
      $scope.allbets = bets;
    });
  }
  allbets();
  $interval(allbets, 5000);
  
  $scope.submit = function () {
    BetService.create($scope.bet).success(function (data) {
      $scope.coins = data;
      $scope.message = 'bet placed!';
      $scope.bet = bet();
      yourbets();
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