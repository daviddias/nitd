var Hapi        = require('hapi');
var options     = require('./options.js');
require('./db');
var fetchIssues = require('./modules/fetchIssues.js');
var logger      = require('./modules/logger.js');


fetchIssues();

var port    = parseInt(process.env.PORT) || 8080;
var server  = module.exports = new Hapi.Server(port, options);



require('./routes');

server.start(function () {
  logger.info('Server started at ' + server.info.uri);
});


