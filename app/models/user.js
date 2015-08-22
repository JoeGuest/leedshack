var thinky = require('../../config/thinky'),
  r = thinky.r,
  type = thinky.type;

var User = thinky.createModel('User', {
  id: String,
  steam_id: String,
  username: String,
  coins: Number
});

module.exports = User;

// example on how to add relations
// var Comment = require('./comment');
// Article.hasMany(Comment, 'comments', 'id', 'article_id');

