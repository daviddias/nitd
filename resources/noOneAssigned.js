var Issue       = require('model').getModelByName('Issue');

exports = module.exports = create;

function create(request, reply) {

  Issue.all({}, gotIssues);
 
  function gotIssues(err, issues) {
    var filtered = [];

    for (var i=0;i<issues.length;i++){
      if(!issues[i].assignee) {
        filtered.push(issues[i]);
      }
    }
    var context = {
      issues: filtered,
      c: 'active'
    };
    reply.view('template', context);
    // console.log('testing');
  }




}
