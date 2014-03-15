var untouched = require('./../resources').untouched;
var withoutLabel = require('./../resources').withoutLabel;
var noOneAssigned = require('./../resources').noOneAssigned;
var noMilestone = require('./../resources').noMilestone;
var noComments = require('./../resources').noComments;
var noActivitySevenDays = require('./../resources').noActivitySevenDays;
var noActivityOneYear = require('./../resources').noActivityOneYear;
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
    path: '/noActivitySevenDays',
    handler: noActivitySevenDays}
);

server.route(
  { method: 'GET',
    path: '/noActivityOneYear',
    handler: noActivityOneYear}
);

server.route(
  { method: 'GET',
    path: '/noOneAssigned',
    handler: noOneAssigned}
);


