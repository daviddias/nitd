var untouched = require('./../resources').untouched;
var withoutLabel = require('./../resources').withoutLabel;
var noOneAssigned = require('./../resources').noOneAssigned;
var noMilestone = require('./../resources').noMilestone;
var noComments = require('./../resources').noComments;
var noActivity7days = require('./../resources').noActivity7days;
var noActivity1year = require('./../resources').noActivity1year;
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

server.route(
  { method: 'GET',
    path: '/withoutLabel',
    handler: withoutLabel}
);

server.route(
  { method: 'GET',
    path: '/noMilestone',
    handler: noMilestone}
);

server.route(
  { method: 'GET',
    path: '/noComments',
    handler: noComments}
);

server.route(
  { method: 'GET',
    path: '/noActivity7days',
    handler: noActivity7days}
);

server.route(
  { method: 'GET',
    path: '/noActivity1year',
    handler: noActivity1year}
);

server.route(
  { method: 'GET',
    path: '/noOneAssigned',
    handler: noOneAssigned}
);


