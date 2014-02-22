// var userHome = require('osenv').home();

var dbConfig = {
  'level': {
    'db': '/tmp/.issue-tracker-dashboard-db/'
  }
};

if (process.env.NODE_ENV === 'dev'){
  console.log('RUNNING ON DEV MODE');
  dbConfig.level.db = '/tmp/.issue-tracker-dashboard-db-dev/';
}

module.exports = dbConfig;
