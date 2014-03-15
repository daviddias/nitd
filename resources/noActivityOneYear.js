//TODO: Yet to be implemented, this is a copy of untouched.js code
var Issue       = require('model').getModelByName('Issue');

exports = module.exports = create;

function create(request, reply) {

  Issue.all({}, gotIssues);
 
  //no accounting for leap year (yet)
  var oneYearInMilliseconds = 365 * 24 * 60 * 60 * 1000;
  var oneYearAgo = new Date().getTime() - oneYearInMilliseconds;

  function gotIssues(err, issues) {
    var filtered = [];

    for (var i=0;i<issues.length;i++){
      if(issues[i].lastActivity == 'undefined' || issues[i].lastActivity == null){
        if(issues[i].createdAt.getTime() < oneYearAgo) {
          filtered.push(issues[i]);
        }
      }else{
        if(issues[i].lastActivity.getTime() < oneYearAgo){
          filtered.push(issues[i]);
        }
      }
    }
    var context = {
      issues: filtered,
      g: 'active'
    };
    reply.view('template', context);
   
  }

}

