var cronJob = require('cron').CronJob;
var fetch = require('./fetchIssues.js');

exports = module.exports = fetchDaily;

function fetchDaily() {
  try {
    var job = new cronJob({
      cronTime: '00 30 11 * * 1-7',
      onTick: function() {
        fetch();
        console.log('FETCH DONE DAILY');
      },
      start: false, // to start after creation
      timeZone: 'Europe/Amsterdam'
    });
    job.start();
  } catch(ex) { console.log('cron pattern not valid'); }
}