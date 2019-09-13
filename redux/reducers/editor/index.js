import { combineReducers } from 'redux';
import documentReducer from './document';
import stylingReducer from './styling';

export default combineReducers({
  document: documentReducer,
  format: stylingReducer,
});
