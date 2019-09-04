import { combineReducers } from 'redux';
import typingReducer from './typing';
import stylingReducer from './styling';

export default combineReducers({
  document: typingReducer,
  format: stylingReducer,
});
