import typeToReducer from 'type-to-reducer';
import { actions } from './actions';

const initialState = {
  ui: {
    loading: false,
  },
  data: {},
  countries: {},
  countryData: {},
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
    [actions.GET_COUNTRY_STATS]: {
      PENDING: state => {
        return Object.assign({}, state, { ui: { loading: true } });
      },
      FULFILLED: (state, action) => {
        return Object.assign({}, state, {
          countryData: {
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
  },
  initialState,
);

export default statsReducer;
