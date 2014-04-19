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
    path: '/{nrpage?}',
    handler: untouched }
);

server.route(
  { method: 'GET',
    path: '/untouched{nrpage?}',
    handler: untouched }
);

server.route(
  { method: 'GET',
    path: '/withoutLabel{nrpage?}',
    handler: withoutLabel}
);

server.route(
  { method: 'GET',
    path: '/noMilestone{nrpage?}',
    handler: noMilestone}
);

server.route(
  { method: 'GET',
    path: '/noComments{nrpage?}',
    handler: noComments}
);

server.route(
  { method: 'GET',
    path: '/noActivitySevenDays{nrpage?}',
    handler: noActivitySevenDays}
);

server.route(
  { method: 'GET',
    path: '/noActivityOneYear{nrpage?}',
    handler: noActivityOneYear}
);

server.route(
  { method: 'GET',
    path: '/noOneAssigned{nrpage?}',
    handler: noOneAssigned}
);


