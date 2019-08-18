import { combineReducers } from 'redux';
import typing from './typing';
import styling from './styling';

const editorReducers = combineReducers({
  typing,
  styling,
});

export default editorReducers;
