var Issue       = require('model').getModelByName('Issue');

exports = module.exports = create;

function create(request, reply) {

  Issue.all({}, gotIssues);
 
  //no accounting for leap year (yet)
  var oneYearInMilliseconds = 365 * 24 * 60 * 60 * 1000;
  var oneYearAgo = new Date().getTime() - oneYearInMilliseconds;

  function gotIssues(err, issues) {
    var filtered = [];
    var page = parseInt(request.query.page) || 1;

    for (var i=0;i<issues.length;i++){
      if(issues[i].updatedAt.getTime() < oneYearAgo){
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
      g: 'active',
      pagination: {
          page: page,
          pageCount: Math.ceil(filtered.length/10)
      }
    };
    reply.view('template', context);
   
  }

}

