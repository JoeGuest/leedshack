var express = require('express'),
  router = express.Router(),
  models = require('../models'),
  Game = models.Game,
  Stat = models.Stat,
  Bet = models.Bet,
  User = models.User,
  r = models.r,
  moment = require('moment');

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

router.get('/yourbets', function (req, res) {
  
  Bet.filter({
    user_id: req.user.id
  }).orderBy(r.desc('created_at'))
  .limit(4)
  .getJoin({game: true})
  .run()
  .then(function (bets) {
    res.json(bets);
  });
  
});

router.get('/allbets', function (req, res) {
  
  Bet.orderBy(r.desc('created_at'))
  .limit(4)
  .getJoin({game: true})
  .run()
  .then(function (bets) {
    res.json(bets);
  });
  
});

function getMultiplier (bet) {
  
  return 2;
  
}

router.post('/bet', function (req, res) {
  
  var b = req.body;
  
  var time = moment(b.complete_time, 'DD/MM/YY HH:mm').format();
  
  // work out multiplier
  var multiplier = getMultiplier(b);
  var coins = parseInt(b.coins);
  var bet = parseInt(b.bet);
  var range = parseInt(b.range);
  
  var bet = new Bet({
    user_id: req.user.id,
    game_id: b.game.id,
    coins: coins,
    bet: bet,
    range: {
      min: bet - (range / 2),
      max: bet + (range / 2)
    },
    complete_time: time,
    is_complete: false,
    multiplier: multiplier
  });
  
  bet.save()
    .then(function () {
      
      User.get(req.user.id).run().then(function (user) {
        req.user.coins -= coins;
        if(req.user.coins < 1) req.user.coins = 1;
        req.user.save()
          .then(function (user) {
            res.json(user.coins);
          });
      });
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