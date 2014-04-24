var Issue       = require('model').getModelByName('Issue');

exports = module.exports = create;

function create(request, reply) {

  Issue.all({}, gotIssues);
 
  function gotIssues(err, issues) {
    var filtered = [];
    var page = parseInt(request.query.page) || 1;

    for (var i=0;i<issues.length;i++){
      if(issues[i].comments === 0) {
        filtered.push(issues[i]);
      }
    }

    if(request.query.sort === 'asc') {
        filtered.sort(function (issueA, issueB){
            return issueA.number - issueB.number;
        });
    }else{
        filtered.sort(function (issueA, issueB){
            return issueB.number - issueA.number;
        });
    }

    var context = {
      issues: filtered.slice((page-1)*10,(page*10)-1),
      e: 'active',
      pagination: {
          page: page,
          pageCount: Math.ceil(filtered.length/10)
      }
    };
    reply.view('template', context);
    //console.log(filtered[0]);
  }




}
