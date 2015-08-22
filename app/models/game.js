var thinky = require('../../config/thinky'),
  r = thinky.r,
  type = thinky.type;

var Game = thinky.createModel('Game', {
  id: String,
  app_id: Number,
  name: String
});

module.exports = Game;

var Stat = require('./stat');
Game.hasMany(Stat, 'stats', 'id', 'game_id');