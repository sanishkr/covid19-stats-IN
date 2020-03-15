import apis from './api';

const actions = {
  GET_STATS: 'GET_STATS',
  GET_COUNTRIES: 'GET_COUNTRIES',
  GET_COUNTRY_STATS: 'GET_COUNTRY_STATS',
};

const actionCreators = {
  getStats: params => {
    return {
      type: actions.GET_STATS,
      payload: apis.getStats(),
    };
  },
  getCountries: params => {
    return {
      type: actions.GET_COUNTRIES,
      payload: apis.getCountries(),
    };
  },
  getCountryStats: params => {
    return {
      type: actions.GET_COUNTRY_STATS,
      payload: apis.getCountryStats(params),
    };
  },
};

export { actions, actionCreators };
