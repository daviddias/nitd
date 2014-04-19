//resources helper functions

function issuesPagination(filteredIssues, nrPage) {
  var MAX_ISSUES_PAGE = 10;

  var paginationData = {};
  var paginadedFilteredIssues = [];
  var firstNextEntry = nrPage*MAX_ISSUES_PAGE;
  var nrMaxPages = Math.round(filteredIssues.length/MAX_ISSUES_PAGE);

  paginationData.previousPageNr = parseInt(nrPage)-1; 
  paginationData.nextPageNr = parseInt(nrPage)+1;

  if(nrPage=='' || nrPage == '0') { 
    nrPage = 1;
    paginationData.nextPageNr = null;
    paginationData.nextPageNr = 2;
  }

  for(var i = firstNextEntry; i<firstNextEntry+MAX_ISSUES_PAGE; i++) {
    if(i>=filteredIssues.length) {
      paginationData.nextPageNr = null;
    	break;
    }
    paginadedFilteredIssues.push(filteredIssues[i]);
  }

  paginationData.nrCurrentPage = nrPage;
  paginationData.nrMaxPages = nrMaxPages;
  paginationData.paginadedFiltered = paginadedFilteredIssues;

  return paginationData;
}

exports.issuesPagination = issuesPagination;
