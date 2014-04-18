var Issue       = require('model').getModelByName('Issue');

exports = module.exports = create;

function create(request, reply) {

  Issue.all({}, gotIssues);
 
  function gotIssues(err, issues) {
    var filtered = [];
    var page = parseInt(request.query.page);
    var totalPages = Math.ceil(filtered.lenght/10);
    

    for (var i=0;i<issues.length;i++){
      if(issues[i].labels.length === 0 &&
        !issues[i].assignee && !issues[i].milestone) {
        filtered.push(issues[i]);
      }
    }

    filtered.sort(function (issueA, issueB){
      return issueA.number - issueB.number;
    });

    var context = {
      issues: filtered.slice((page-1)*10,(page*10)-1),
      a: 'active',
      pagination: {
          previousPage: page-1,
          nextPage: page+1,
          isFirstPage: page != 1,
          isLastPage: page != totalPages
      }
    };
    reply.view('template', context);
  }

}
