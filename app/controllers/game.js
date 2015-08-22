var express = require('express'),
  router = express.Router(),
  models = require('../models'),
  Game = models.Game,
  Stat = models.Stat,
  Bet = models.Bet,
  User = models.User,
  r = models.r;

module.exports = function (app) {
  app.use('/', router);
};

router.get('/coins', function (req, res) {
  res.json(req.user.coins);
});

router.get('/stats', function (req, res, next) {
  res.json(req.user);
});

router.get('/richest', function (req, res) {
  User.pluck('username', 'coins', 'avatar').orderBy(r.desc('coins')).run().then(function (users) {
    res.json(users);
  });
});

router.get('/statsforgame', function (req, res) {
  var id = req.query.id;
  Stat.filter({game_id: id}).orderBy(r.desc('created_at')).limit(1).run().then(function (stat) {
    res.json(stat);
  });
});

router.post('/getmultiplier', function (req, res) {
  var b = req.body;
  
  
});

function getMultiplier (bet) {
  
  return 2;
  
}

router.post('/bet', function (req, res) {
  
  var b = req.body;
  
  var time = b.complete_time;
  // convert time
  
  
  // work out multiplier
  var multiplier = getMultiplier(b);
  
  var bet = new Bet({
    user_id: req.user.id,
    game_id: b.game.id,
    coins: b.coins,
    bet: b.bet,
    range: {
      min: 0,
      max: 0
    },
    complete_time: time,
    is_complete: false,
    multiplier: multiplier
  });
  
  bet.save()
    .then(function () {
      res.json();
    });
  
  
});

router.get('/bet/me', function (req, res) {
  
  Bet.filter({
    user_id: req.user.id,
    complete: false
  }).run().then(function (bets) {
    res.json(bets);
  });
  
});

router.get('/bet/friends', function (req, res) {
  
  res.json([]);
  
});

router.get('/bet/popular', function (req, res) {
  
  res.json([]);
  
});


router.get('/games', function (req, res) {
  Game.orderBy('name').run().then(function (games) {
    res.json(games);
  });
});