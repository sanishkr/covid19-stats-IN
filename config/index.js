module.exports = {
  development: {
    api: 'https://covid19.mathdro.id/api',
  },
  stage: {
    api: 'https://covid19.mathdro.id/api',
  },
  production: {
    api: 'https://covid19.mathdro.id/api',
  },
}[process.env.NODE_ENV];
