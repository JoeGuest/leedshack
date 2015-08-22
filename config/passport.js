var SteamStrategy = require('passport-steam').Strategy,
  models = require('../app/models'),
  User = models.User,
  apikeys = require('./apikeys');

module.exports = function (passport){

  passport.serializeUser(function (user, done){
    console.log('seralizing user');
    console.log(user);
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.get(id).run().then(function (user) {
      done(null, user);
    }).error(done);
  });
  
  passport.use(new SteamStrategy({
      returnURL: 'http://localhost:3000/auth/steam/return',
      realm: 'http://localhost:3000/',
      apiKey: apikeys.steam
    },
    function(identifier, profile, done) {
      var info = profile._json;
      User.filter({ steam_id: profile.id }).limit(1).run()
        .then(function (users) {
          if(!users.length){
            var user = new User({
              steam_id: profile.id,
              username: info.personaname,
              coins: 100,
              profileurl: info.profileurl,
              avatar: info.avatar,
              avatarmedium: info.avatarmedium,
              avatarfull: info.avatarfull,
              realname: info.realname,
              loccountrycode: info.loccountrycode
            });
            user.save().then(function (user) {
              done(null, user);
            }).error(done);
          }else{
            var user = users[0];
            done(null, user);
          }
        }).error(done);
    }
  ));

};