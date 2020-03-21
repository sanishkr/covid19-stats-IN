import { combineReducers } from 'redux';
import { reducer as statsReducer } from './stats';
import { reducer as indiaStatsReducer } from './india';

export default combineReducers({
  statsReducer,
  indiaStatsReducer,
});
