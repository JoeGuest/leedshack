var express = require('express'),
  router = express.Router(),
  models = require('../models'),
  Game = models.Game,
  Stat = models.Stat,
  Bet = models.Bet;

module.exports = function (app) {
  app.use('/', router);
};

router.get('/stats', function (req, res, next) {
  res.json(req.user);
});

router.post('/bet', function (req, res) {
  
  var b = req.body;
  
  
  
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
  Game.run().then(function (games) {
    res.json(games);
  });
});