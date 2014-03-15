require('colors');
var request     = require('request');
var Issue       = require('model').getModelByName('Issue');
var secret      = require('./../secret.json').secret;
var repo        = 'joyent/node';

var options = {
  url: 'https://api.github.com/repos/' + repo + '/issues',
  headers: {
    'User-Agent': secret.useragent
  },
  qs: {
    state: 'open',
    page: 1,
    access_token: secret.accesstoken
  }
};


module.exports = function(state) {
  if(!secret.useragent || !secret.accesstoken){
    return console.log('No access credentials defined');
  }

  if (state) {
    options.qs.state = state;
  }
  request.get(options, receiveIssues);
};

function receiveIssues(err, response, body) {
  if (err) {
    return console.log(err);
  }
  parseIssues(body);

  if (response.headers.link && response.headers.link.indexOf('next') !== -1){
    // there is more to fetch
    options.qs.page = options.qs.page + 1;
    request.get(options, receiveIssues);
  } else {
    options.qs.page = 1;
  }
}

function parseIssues(body) {
  if(body.indexOf('API rate limit exceeded') !== -1) {
    console.log('API rate limit exceeded');
    process.exit(1);
  }

  JSON.parse(body).forEach(storeIssue);
}


function storeIssue(issue) {
  // 1. Verify if exists
  Issue.all({number: issue.number}, gotIssues(issue));

  function gotIssues(_issue) {
    var issue = _issue;

    return function (err, result) {
      if (err) {
        return console.log(err);
      }
      var opt = {
        url: 'https://api.github.com/repos/' + repo + '/issues/' + issue.number + '/comments',
        headers: {
          'User-Agent': secret.useragent
        },
        qs: {
          access_token: secret.accesstoken
        }
      };

      request.get(opt, function(err, resp, body) {
        if (err) {
          return console.log(err);
        }

        if (result.length > 0) {
          // 1.a if yes - update
          result[0].url = issue.url;
          result[0].htmlUrl = issue.html_url;
          result[0].state = issue.state;
          result[0].title = issue.title;
          result[0].body = issue.body;
          result[0].user = issue.user;
          result[0].labels = issue.labels;
          result[0].assignee = issue.assignee;
          result[0].milestone = issue.milestone;
          result[0].comments = issue.comments;
          result[0].pullRequest = issue.pull_request;
          result[0].closedAt = issue.closed_at;
          result[0].createdAt = issue.created_at;
          result[0].updatedAt = issue.updated_at;
          result[0].lastActivity = parseRecentDate(body);

          //console.log(result[0].lastActivity);

          result[0].save(function (err, data) {
            if (err) {
              return console.log(err);
            }
            console.log('Updated Issue: '.green+issue.number + ' ' + new Date());
          });

        } else {
          // 1.b if not - store
          var cleanIssue = {};

          cleanIssue.url = issue.url;
          cleanIssue.htmlUrl = issue.html_url;
          cleanIssue.number = issue.number;
          cleanIssue.state = issue.state;
          cleanIssue.title = issue.title;
          cleanIssue.body = issue.body;
          cleanIssue.user = issue.user;
          cleanIssue.labels = issue.labels;
          cleanIssue.assignee = issue.assignee;
          cleanIssue.milestone = issue.milestone;
          cleanIssue.comments = issue.comments;
          cleanIssue.pullRequest = issue.pull_request;
          cleanIssue.closedAt = issue.closed_at;
          cleanIssue.createdAt = issue.created_at;
          cleanIssue.updatedAt = issue.updatedAt;
          cleanIssue.lastActivity = parseRecentDate(body);
        
          //console.log(cleanIssue.lastActivity);

          var newIssue = Issue.create(cleanIssue);
          newIssue.save( function (err, data) {
            if (err) {
              return console.log(err);
            }
            // console.log('Data saved \n'.yellow, data);
            console.log('New Issue Saved: '.green+data.number + ' ' + new Date());
          });
        }
      });
    };
  }
}

//parses comments and returns the most recented date
//which represents the last activity in the issue
function parseRecentDate(comments) {
  
  var date = 0;

  if(comments.length === 2){ return null; }

  JSON.parse(comments).forEach(function (comment) {

    //change from ISO time format to date
    //console.log(comment.updated_at)
    var time = new Date(comment.updated_at);
    time =   new Date( time.getTime() + ( time.getTimezoneOffset() * 60000 ) ).getTime();
    if(date < time) { date = time; }
  });

  //console.log(date);
  //console.log(new Date(date));
  return new Date(date);
}
