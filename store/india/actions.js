import apis from './api';

const actions = {
  GET_LATEST_STATSI_INDIA: 'GET_LATEST_STATSI_INDIA',
  GET_DAILY_SUMMARY_INDIA: 'GET_DAILY_SUMMARY_INDIA',
};

const actionCreators = {
  getLatestStatsIndia: params => {
    return {
      type: actions.GET_LATEST_STATSI_INDIA,
      payload: apis.getLatestStatsIndia(),
    };
  },
  getDailySummaryIndia: params => {
    return {
      type: actions.GET_DAILY_SUMMARY_INDIA,
      payload: apis.getDailySummaryIndia(),
    };
  },
};

export { actions, actionCreators };
