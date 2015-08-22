var thinky = require('../../config/thinky'),
  r = thinky.r,
  type = thinky.type;

var Stat = thinky.createModel('Stat', {
  id: String,
  game_id: String,
  num_players: Number,
  created_at: type.date().default(r.now())
});

Stat.ensureIndex('created_at');

module.exports = Stat;
