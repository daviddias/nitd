var Issue       = require('model').getModelByName('Issue');

exports = module.exports = create;

function create(request, reply) {

  Issue.all({}, gotIssues);
 
  var sevenDaysInMilliseconds = 7 * 24 * 60 * 60 * 1000;
  var sevenDaysAgo = new Date().getTime() - sevenDaysInMilliseconds;

  function gotIssues(err, issues) {
    var filtered = [];
    var page = parseInt(request.query.page) || 1;

    for (var i=0;i<issues.length;i++){
      console.log(issues[i].updatedAt);
      if(issues[i].updatedAt.getTime() < sevenDaysAgo){
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
      f: 'active',
      pagination: {
          page: page,
          pageCount: Math.ceil(filtered.length/10)
      }
    };
    reply.view('template', context);
    //console.log(filtered[0]);
  }

}

