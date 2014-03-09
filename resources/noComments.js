var Issue       = require('model').getModelByName('Issue');

exports = module.exports = create;

function create(request, reply) {

  Issue.all({}, gotIssues);
 
  function gotIssues(err, issues) {
    var filtered = [];

    for (var i=0;i<issues.length;i++){
      if(issues[i].comments === 0) {
        filtered.push(issues[i]);
      }
    }
    var context = {
      issues: filtered,
      e: 'active'
    };
    reply.view('template', context);
    console.log(filtered[1]);
  }




}
