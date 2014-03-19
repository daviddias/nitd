var Hapi        = require('hapi');
var options     = require('./options.js');
require('./db');
var fetchIssues = require('./modules/fetchIssues.js');
var worker        = require('./modules/worker.js');
var logger      = require('./modules/logger.js');

// Run the first time
fetchIssues();

var port    = parseInt(process.env.PORT) || 9000;
var server  = module.exports = new Hapi.Server(port, options);

require('./routes');

server.start(function () {
  logger.info('Server started at ' + server.info.uri);
  worker(); // Start the cron job
});


