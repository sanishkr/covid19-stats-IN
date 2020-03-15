import apis from './api';

const actions = {
  GET_STATS: 'GET_STATS',
  GET_COUNTRIES: 'GET_COUNTRIES',
  GET_COUNTRY_STATS: 'GET_COUNTRY_STATS',
  GET_THEME: 'GET_THEME',
  SET_THEME: 'SET_THEME',
};

const actionCreators = {
  getStats: params => {
    return {
      type: actions.GET_STATS,
      payload: apis.getStats(),
    };
  },
  getTheme: () => {
    return {
      type: actions.GET_THEME,
      payload: {},
    };
  },
  setTheme: params => {
    return {
      type: actions.SET_THEME,
      payload: {
        theme: params,
      },
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
