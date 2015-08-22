var thinky = require('../../config/thinky'),
  r = thinky.r,
  type = thinky.type;

var User = thinky.createModel('User', {
  id: String,
  steam_id: String,
  username: String,
  coins: Number,
  profileurl: String,
  avatar: String,
  avatarmedium: String,
  avatarfull: String,
  realname: String,
  loccountrycode: String
});

module.exports = User;

// example on how to add relations
var Bet = require('./bet');
User.hasMany(Bet, 'bets', 'id', 'user_id');
