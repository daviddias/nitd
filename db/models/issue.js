var model = require('model');
var adapter = require('./..').adapter;

var Issue = function () {
  this.adapter = adapter;
  this.property('url','string');
  this.property('htmlUrl','string');
  this.property('number','number');
  this.property('state','string');
  this.property('title','string');
  this.property('body','string');
  this.property('user','object');
  this.property('labels','object');
  this.property('assignee','object');
  this.property('milestone','object');
  this.property('comments','number');
  this.property('pullRequest','object');
  this.property('closedAt','date');
  this.property('createdAt','date');
  this.property('updatedAt','date');
};

model.register('Issue', Issue);
