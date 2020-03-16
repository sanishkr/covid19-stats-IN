import typeToReducer from 'type-to-reducer';
import { parseCookies, setCookie } from 'nookies';

import { actions } from './actions';

const cookies = new parseCookies();
const initialState = {
  ui: {
    loading: false,
  },
  data: {},
  countries: {},
  countryData: {},
  theme: cookies.theme,
  error: '',
};

const statsReducer = typeToReducer(
  {
    [actions.GET_STATS]: {
      PENDING: state => {
        return Object.assign({}, state, { ui: { loading: true } });
      },
      FULFILLED: (state, action) => {
        return Object.assign({}, state, {
          data: {
            ...state.data,
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
    [actions.GET_COUNTRIES]: {
      PENDING: state => {
        return Object.assign({}, state, { ui: { loading: true } });
      },
      FULFILLED: (state, action) => {
        return Object.assign({}, state, {
          countries: {
            ...state.countries,
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
    [actions.GET_COUNTRY_STATS]: {
      PENDING: state => {
        return Object.assign({}, state, { ui: { loading: true } });
      },
      FULFILLED: (state, action) => {
        return Object.assign({}, state, {
          countryData: {
            ...state.countryData,
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
    [actions.SET_THEME]: (state, action) => {
      localStorage.setItem('theme', action.payload.theme);
      return Object.assign({}, state, {
        theme: action.payload.theme,
        ui: { loading: false },
      });
    },
    [actions.GET_THEME]: (state, action) => {
      return Object.assign({}, state, {
        theme: state.theme,
        ui: { loading: false },
      });
    },
  },
  initialState,
);

export default statsReducer;
