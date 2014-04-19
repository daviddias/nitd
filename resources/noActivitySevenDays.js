var Issue       = require('model').getModelByName('Issue');
var lib = require('./lib/lib.js');

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

    filtered.sort(function (issueA, issueB){
      return issueA.number - issueB.number;
    });

        //execute pagination
        var nrPage = request.params.nrpage.slice(1);
        paginationData = lib.issuesPagination(filtered, nrPage);

        var context = {
          issues: paginationData.paginadedFiltered,
          f: 'active',
          nrMaxPages: paginationData.nrMaxPages,
          nrCurrentPage: paginationData.nrCurrentPage,
          nrPages: paginationData.nrMaxPages,
          previousPageNr: paginationData.previousPageNr,
          nextPageNr: paginationData.nextPageNr,
          typeIssues: 'noActivitySevenDays'
        };

        reply.view('template', context);
    //console.log(filtered[0]);
  }

}

