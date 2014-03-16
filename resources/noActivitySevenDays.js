var Issue       = require('model').getModelByName('Issue');

exports = module.exports = create;

function create(request, reply) {

  Issue.all({}, gotIssues);
 
  var sevenDaysInMilliseconds = 7 * 24 * 60 * 60 * 1000;
  var sevenDaysAgo = new Date().getTime() - sevenDaysInMilliseconds;

  function gotIssues(err, issues) {
    var filtered = [];

    
    for (var i=0;i<issues.length;i++){
      console.log(issues[i].updatedAt);
      if(issues[i].updatedAt.getTime() < sevenDaysAgo){
        filtered.push(issues[i]);
      }
    }
    var context = {
      issues: filtered,
      f: 'active'
    };
    reply.view('template', context);
    //console.log(filtered[0]);
  }

}

