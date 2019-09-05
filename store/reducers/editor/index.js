import { combineReducers } from 'redux';
import keyboardReducer from './keyboard';
import stylingReducer from './styling';

export default combineReducers({
  document: keyboardReducer,
  format: stylingReducer,
});
