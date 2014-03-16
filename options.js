module.exports = {
  cache: {
    engine: 'catbox-memory'
  },
  cors: true,
  state: {
    cookies: {
      strictHeader: false
    }
  },
  views: {
    engines: {
      html: 'handlebars'
    },
    path: __dirname + '/views',
    partialsPath: __dirname + '/views/partials',
    helpersPath: __dirname + '/helpers',
  }
};
