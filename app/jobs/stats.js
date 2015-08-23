var models = require('../models'),
  Game = models.Game,
  Stat = models.Stat,
  Bet = models.Bet,
  User = models.User,
  r = models.r,
  axios = require('axios'),
  cheerio = require('cheerio'),
  Promise = require('bluebird');
  
function getStats () {
  axios.get('http://store.steampowered.com/stats')
    .then(function (response) {
      var $ = cheerio.load(response.data);
      var stats = [];
      $('.player_count_row').each(function (i, ele) {
        var gameLink = $(this).find('.gameLink');
        var players = $(this).find('.currentServers');
        
        var name = gameLink.text();
        var num_players = players[0].children[0].data;
        
        // get or create game
        Game.filter({name: name}).run()
          .then(function (game) {
            if(!game.length) {
              var appidmatch = gameLink.attr('href').match(/(\d+)/);
              // create new game
              var g = new Game({
                app_id: appidmatch ? parseInt(appidmatch[0]) : null,
                name: name
              });
              return g.save();
            } else {
              return game;
            }
            
          })
          .then(function (game) {
            // create Stat
            if(game[0]) game = game[0];
            var s = new Stat({
              game_id: game.id,
              num_players: parseInt(num_players.replace(/,/g, ''))
            });
            return s.save();
          })
          .then(function (stat) {
            // work out wins etc
            Bet.filter(r.row('complete_time').lt(r.now()))
              .filter({
                is_complete: false,
                game_id: stat.game_id
              })
              .run()
              .then(function (bets) {
                if(!bets) return;
                bets.forEach(function (bet) {
                  
                  if(stat.num_players >= bet.range.min ||
                    stat.num_players <= bet.range.max) {
                    // success
                    bet.success = true;
                    bet.is_complete = true;
                    bet.payout = bet.coins * bet.multiplier;
                    bet.stat_id = stat.id;
                    bet.save()
                      .then(function () {
                        User.get(bet.user_id).run().then(function (user) {
                          user.coins += bet.payout;
                          user.save();
                        });
                      });
                  }else{
                    // fail
                    bet.success = false;
                    bet.is_complete = true;
                    bet.payout = 0;
                    bet.stat_id = stat.id;
                    bet.save();
                  }
                  
                });
              });
          });
        
      });
    })
    .then(function () {
      console.log('got stats');
    });
}

console.log('getting dem stats');

getStats();
setInterval(getStats, 60 * 1000);