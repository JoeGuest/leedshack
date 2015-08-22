var express = require('express'),
  router = express.Router(),
  models = require('../models'),
  Game = models.Game,
  Stat = models.Stat;

module.exports = function (app) {
  app.use('/', router);
};

router.get('/stats', function (req, res, next) {
  res.json('hello');
});
