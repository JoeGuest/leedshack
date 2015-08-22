var thinky = require('../../config/thinky'),
  r = thinky.r,
  type = thinky.type;

var Bet = thinky.createModel('Bet', {
  id: String,
  game_id: String,
  user_id: String,
  stat_id: String,
  coins: Number,
  bet: Number,
  range: {
    min: Number,
    max: Number
  },
  complete_time: Date,
  is_complete: type.boolean().default(false),
  success: Boolean,
  payout: Number,
  multiplier: Number
});

module.exports = Bet;

var Game = require('./game');
Bet.belongsTo(Game, 'game', 'game_id', 'id');

var User = require('./user');
Bet.belongsTo(User, 'user', 'user_id', 'id');

var Stat = require('./stat');
Bet.belongsTo(Game, 'stat', 'stat_id', 'id');