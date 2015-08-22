var glob = require('glob');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var RedisStore = require('connect-redis')(session);
var passportSocketIo = require('passport.socketio');

module.exports = function (server, config) {
  var io = require('socket.io')(server);
  console.log(config);
  io.use(passportSocketIo.authorize({
    cookieParser: cookieParser,
    key: 'steambet',
    secret: config.sessionSecret,
    store: new RedisStore(config.redis)
  }));
  
  io.on('connection', function (socket) {
    console.log('connection!');
    // var listeners = glob.sync(config.root + '/app/listeners/*.js');
    // console.log(listeners);
    // listeners.forEach(function (controller) {
    //   require(controller)(socket);
    // });
  });
};