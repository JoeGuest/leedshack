var express = require('express'),
  router = express.Router(),
  models = require('../models')

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'SteamBet',
    user: req.user
  });
});
