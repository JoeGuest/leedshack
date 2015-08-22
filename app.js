var express = require('express'),
  config = require('./config/config'),
  glob = require('glob');

var app = express();

require('./config/express')(app, config);

//spawn job processes
var jobs = glob.sync(config.root + '/app/jobs/*.js');
jobs.forEach(function (job) {
  require(job);
});

app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});

