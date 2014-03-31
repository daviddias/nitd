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
      if(issues[i].updatedAt.getTime() < oneYearAgo){
        filtered.push(issues[i]);
      }
    }

    filtered.sort(function (issueA, issueB){
      return issueA.number - issueB.number;
    });
    
    var context = {
      issues: filtered,
      g: 'active'
    };
    reply.view('template', context);
   
  }

}

