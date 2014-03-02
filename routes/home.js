var untouched = require('./../resources').untouched;
var server    = require('./../index.js');

server.route(
  { method: 'GET',
    path: '/',
    handler: untouched }
);

server.route(
  { method: 'GET',
    path: '/untouched',
    handler: untouched }
);