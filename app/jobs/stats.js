var models = require('../models'),
  Game = models.Game,
  Stat = models.Stat,
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