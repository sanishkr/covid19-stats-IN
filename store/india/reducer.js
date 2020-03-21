import typeToReducer from 'type-to-reducer';
import { parseCookies, setCookie } from 'nookies';

import { actions } from './actions';

const cookies = new parseCookies();
const initialState = {
  ui: {
    loading: false,
  },
  latestData: {},
  dailySummaryData: {
    data: [],
  },
  theme: cookies.theme,
  error: '',
};

const indiaStatsReducer = typeToReducer(
  {
    [actions.GET_LATEST_STATSI_INDIA]: {
      PENDING: state => {
        return Object.assign({}, state, { ui: { loading: true } });
      },
      FULFILLED: (state, action) => {
        return Object.assign({}, state, {
          latestData: {
            ...state.latestData,
            ...action.payload.data,
          },
          ui: { loading: false },
        });
      },
      REJECTED: (state, action) => {
        return Object.assign({}, state, {
          error: action.payload.message,
          ui: { loading: false },
        });
      },
    },
    [actions.GET_DAILY_SUMMARY_INDIA]: {
      PENDING: state => {
        return Object.assign({}, state, { ui: { loading: true } });
      },
      FULFILLED: (state, action) => {
        return Object.assign({}, state, {
          dailySummaryData: action.payload.data,
          ui: { loading: false },
        });
      },
      REJECTED: (state, action) => {
        return Object.assign({}, state, {
          error: action.payload.message,
          ui: { loading: false },
        });
      },
    },
  },
  initialState,
);

export default indiaStatsReducer;
