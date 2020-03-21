module.exports = {
  development: {
    api: 'https://covid19.mathdro.id/api',
    india: 'https://api.rootnet.in/covid19-in',
  },
  stage: {
    api: 'https://covid19.mathdro.id/api',
    india: 'https://api.rootnet.in/covid19-in',
  },
  production: {
    api: 'https://covid19.mathdro.id/api',
    india: 'https://api.rootnet.in/covid19-in',
  },
}[process.env.NODE_ENV];
